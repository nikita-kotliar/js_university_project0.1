import handlerStartBtn from './exercises_card.js';
import { displayQuote } from './localalStorageLogical.js';
const refs = {
  filters: document.querySelector('.filters'),
  navButtons: document.querySelector('.nav-buttons'),
  musclesBtn: document.querySelector('.muscles-btn'),
  exercisesTitle: document.querySelector('.exercises-title'),
  searchForm: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  quoteContainer: document.querySelector('.quote'),
  pagination: document.querySelector('.pagination'),
  exercises: document.querySelector('.exercises-div'),
};

let limit = window.innerWidth < 768 ? 9 : 12;
let limitx = window.innerWidth < 768 ? 8 : 10;
let page = 1;

let currentFilter = 'Muscles';
let searchQuery = 'Muscles';
let keyWord = '';
let filter = '';
let name = '';
let localResponse = [];

displayQuote(refs.quoteContainer);
fetchFilters();
refs.musclesBtn.classList.add('active-btn');

refs.filters.addEventListener('click', pressFilterBtn);
refs.exercises.addEventListener('click', loadExercises);
refs.searchForm.addEventListener('input', onLiveSearch);
refs.loadMoreBtn?.addEventListener('click', loadMore);

async function fetchFilters(reset = true) {
  if (reset) {
    page = 1;
    refs.exercises.innerHTML = '';
  }

  let url = `https://your-energy.b.goit.study/api/filters?filter=${currentFilter}&page=${page}&limit=${limit}`;

  if (searchQuery.trim()) {
    url += `&name=${searchQuery}`;
  }

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results.length) {
    showNoResults();
    return;
  }

  makeFilterCards(data.results);
  renderPagination(data.totalPages);
}

function makeFilterCards(items) {
  const markup = `
    <ul class="exercises">
      ${items
        .map(({ name, filter, imgURL }) => {
          return `
            <li class="exercise">
              <img
                src="${imgURL}?w=290&h=242"
                srcset="
                  ${imgURL}?w=335&h=225 335w,
                  ${imgURL}?w=225&h=225 225w,
                  ${imgURL}?w=290&h=242 290w
                "
                sizes="(max-width: 767px) 335px,
                       (min-width: 768px) and (max-width: 1439px) 225px,
                       290px"
                alt="${name}"
                loading="lazy"
                class="exercise-image"
              />

              <div class="exercise-info">
                <h2 class="exercise-subtitle">
                  ${name[0].toUpperCase() + name.slice(1)}
                </h2>
                <p class="exercise-filter">${filter}</p>
              </div>
            </li>
          `;
        })
        .join('')}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;

  refs.exercises.insertAdjacentHTML('beforeend', markup);
}

function pressFilterBtn(event) {
  if (event.target.tagName !== 'BUTTON') return;

  document.querySelector('.active-btn')?.classList.remove('active-btn');
  event.target.classList.add('active-btn');
  if (event.target.classList.contains('muscles-btn')) {
    currentFilter = 'Muscles';
  } else if (event.target.classList.contains('bodyparts-btn')) {
    currentFilter = 'Body parts';
  } else if (event.target.classList.contains('equipment-btn')) {
    currentFilter = 'Equipment';
  }

  refs.exercisesTitle.textContent = 'Exercises';
  refs.searchForm.style.display = 'none';

  fetchFilters(true);
}

async function loadExercises(event) {
  const card = event.target.closest('.exercise');
  if (!card) return;

  const filterEl = card.querySelector('.exercise-filter');
  const nameEl = card.querySelector('.exercise-subtitle');

  if (!filterEl || !nameEl) return;

  filter = filterEl.textContent;
  name = nameEl.textContent.toLowerCase();

  refs.exercisesTitle.innerHTML = `
    <ul class="exercises-title">
      Exercises / <span>${capitalize(name)}</span>
    </ul>
  `;

  refs.searchForm.style.display = 'block';

  page = 1;
  refs.exercises.innerHTML = '';

  await fetchExercises();
}

async function fetchExercises(reset = true) {
  if (reset) localResponse = [];

  let preparedFilter = filter.toLowerCase();
  if (preparedFilter === 'body parts') preparedFilter = 'bodypart';

  const url = `
    https://your-energy.b.goit.study/api/exercises?
    ${preparedFilter}=${name}
    &keyword=${keyWord}
    &page=${page}
    &limit=${limitx}
  `.replace(/\s+/g, '');

  const res = await fetch(url);
  const data = await res.json();

  if (!data.results.length) {
    showNoResults();
    return;
  }

  localResponse = data.results;
  makeExercisesCards(data.results);
  renderPagination(data.totalPages);
}

async function makeExercisesCards(response) {
  refs.exercises.innerHTML = '';
  localResponse = response;

  const markup = `
    <ul class="exercises-cards">
      ${response
        .map(
          ({ name, _id, rating, burnedCalories, bodyPart, target, time }) => {
            let calories = `${burnedCalories} / ${time} min`;
            if (rating % 1 === 0) rating += '.0';
            rating = parseFloat(rating).toFixed(1);
            return `
              <li class="exercise-information" data-id-card="${_id}">
                <div class="top-nav">
                  <div>
                    <p class="tag">Workout</p>
                    <span class="rating">
                      ${rating}
                      <svg class="star-icon" width="14" height="14">
                        <use href="/js_university_project0.1/icons.svg#icon-star"></use>
                      </svg>
                    </span>
                  </div>
                  <button
                    name="start"
                    data-action="start"
                    data-id="${_id}"
                    class="details-link">
                    Start
                    <svg class="arrow-icon" width="16" height="16">
                      <use href="/js_university_project0.1/icons.svg#icon-arrow"></use>
                    </svg>
                  </button>
                </div>

                <div class="exercise-header">
                  <svg class="icon-man" fill="white" width="24" height="24">
                    <use href="/js_university_project0.1/icons.svg#icon-run"></use>
                  </svg>
                  <h2 class="exercise-name">
                    ${capitalize(name)}
                  </h2>
                </div>

                <ul class="exercise-details">
                  <li>
                    <span>Burned calories:</span>
                    ${calories}
                  </li>
                  <li>
                    <span>Body part:</span>
                    ${capitalize(bodyPart)}
                  </li>
                  <li>
                    <span>Target:</span>
                    ${capitalize(target)}
                  </li>
                </ul>
              </li>
            `;
          }
        )
        .join('')}
    </ul>
    <ul class="nav-buttons pagination" id="pagination-container"></ul>
  `;

  refs.exercises.insertAdjacentHTML('beforeend', markup);
}

function onLiveSearch(event) {
  const value = event.target.value.trim().toLowerCase();
  keyWord = value;
  page = 1;

  refs.exercises.innerHTML = '';

  fetchExercises(true);
}

function onSearch(event) {
  event.preventDefault();

  keyWord = event.target.searchQuery.value.trim();
  page = 1;
  filter = '';
  currentFilter = '';
  refs.exercises.innerHTML = '';
  refs.exercisesTitle.textContent = `Search results for "${keyWord}"`;
  refs.searchForm.style.display = 'block';

  if (!keyWord) {
    currentFilter = 'Muscles';
    refs.exercisesTitle.textContent = 'Exercises';
    refs.searchForm.style.display = 'none';
    fetchFilters(true);
  } else {
    fetchExercises(true);
  }
}

function renderPagination(totalPages) {
  const paginationContainer = document.querySelector('#pagination-container');
  if (!paginationContainer) return;
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }

  let html = '';

  const createPageBtn = p => `
    <li>
      <button
        class="pagination-btn ${p === page ? 'active' : ''}"
        data-page="${p}">
        ${p}
      </button>
    </li>
  `;

  let start = Math.max(1, page - 1);
  let end = Math.min(totalPages, page + 1);

  if (page === 1) end = Math.min(totalPages, 3);
  if (page === totalPages) start = Math.max(1, totalPages - 2);

  if (start > 1) {
    html += createPageBtn(1);
    if (start > 2 && totalPages > 4) html += `<li class="dots">...</li>`;
  }

  for (let i = start; i <= end; i++) html += createPageBtn(i);

  if (end < totalPages) {
    if (end < totalPages - 1 && totalPages > 4)
      html += `<li class="dots">...</li>`;
    html += createPageBtn(totalPages);
  }

  paginationContainer.innerHTML = html;
}


refs.exercises.addEventListener('click', e => {
  const btn = e.target.closest('.pagination-btn');
  if (!btn) return;

  const selectedPage = Number(btn.dataset.page);
  if (selectedPage === page) return;

  page = selectedPage;
  refs.exercises.innerHTML = '';

  filter ? fetchExercises(false) : fetchFilters(false);
});


refs.exercises.addEventListener('click', event => {
  const btn = event.target.closest('[data-action="start"]');
  if (!btn) return;

  const exercise = localResponse.find(el => el._id === btn.dataset.id);
  handlerStartBtn(exercise);
});


function showNoResults() {
  refs.exercises.innerHTML = `
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `;
  refs.loadMoreBtn?.style.setProperty('display', 'none');
  if (refs.pagination) {
    refs.pagination.innerHTML = '';
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

