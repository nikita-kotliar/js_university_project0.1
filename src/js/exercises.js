
import handlerStartBtn from './exercises-modal.js';
import { fetchFilterss, fetchExercisess } from './api.js';
import { renderQuoteHTML } from './quote.js';
import { renderExercises } from './exercise.js';

const refs = {
  filters: document.querySelector('.filters'),
  musclesBtn: document.querySelector('.muscles-btn'),
  exercisesTitle: document.querySelector('.exercises-title'),
  searchForm: document.querySelector('.search-form'),
  quoteContainer: document.querySelector('.quote'),
  exercises: document.querySelector('.exercises-cards'),
  pagination: document.querySelector('#pagination-container'),
};

let page = 1;
let limitFilters = window.innerWidth < 768 ? 9 : 12;
let limitExercises = window.innerWidth < 768 ? 8 : 10;

let currentFilter = 'Muscles';
let filter = '';
let name = '';
let keyWord = '';
let localResponse = [];

renderQuoteHTML(refs.quoteContainer);
refs.musclesBtn.classList.add('active-btn');
fetchFilters();

refs.filters.addEventListener('click', onFilterChange);
refs.exercises.addEventListener('click', onExerciseClick);
refs.searchForm.addEventListener('input', onSearch);
refs.pagination.addEventListener('click', onPaginationClick);

async function fetchFilters(reset = true) {
  if (reset) {
    page = 1;
    refs.exercises.innerHTML = '';
  }

  const data = await fetchFilterss(
    currentFilter,
    page,
    limitFilters,
    currentFilter
  );

  if (!data.results.length) return showNoResults();

  renderFilterCards(data.results);
  renderPagination(data.totalPages);
}

function renderFilterCards(items) {
  refs.exercises.innerHTML = `
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
  `;
};

function onFilterChange(e) {
  const btn = e.target.closest('button');
  if (!btn) return;

  document.querySelector('.active-btn')?.classList.remove('active-btn');
  btn.classList.add('active-btn');

  currentFilter = btn.classList.contains('muscles-btn')
    ? 'Muscles'
    : btn.classList.contains('bodyparts-btn')
      ? 'Body parts'
      : 'Equipment';

  refs.exercisesTitle.textContent = 'Exercises';
  refs.searchForm.style.display = 'none';

  filter = '';
  name = '';
  keyWord = '';

  fetchFilters(true);
}

async function onExerciseClick(e) {
  const card = e.target.closest('.exercise');
  if (!card) return;

  const filterEl = card.querySelector('.exercise-filter');
  const nameEl = card.querySelector('.exercise-subtitle');

  if (!filterEl || !nameEl) return;

  filter = normalizeFilter(filterEl.textContent);
  name = nameEl.textContent.toLowerCase();

  refs.exercisesTitle.innerHTML = `
    Exercises / <span>${capitalize(name)}</span>
  `;
  refs.searchForm.style.display = 'block';

  page = 1;
  fetchExercises(true);
}

async function fetchExercises(reset = true) {
  if (reset) {
    page = 1;
    refs.exercises.innerHTML = '';
  }

  const data = await fetchExercisess(
    filter,
    name,
    keyWord,
    page,
    limitExercises
  );

  if (!data.results.length) return showNoResults();

  localResponse = data.results;
  refs.exercises.innerHTML = renderExercises(data.results, false);
  renderPagination(data.totalPages);
}

function onSearch(e) {
  keyWord = e.target.value.trim().toLowerCase();
  page = 1;
  fetchExercises(true);
}

function renderPagination(totalPages) {
  if (totalPages <= 1) {
    refs.pagination.innerHTML = '';
    return;
  }

  let html = '';

  html += pageBtn(page - 1, '←', page === 1);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      html += pageBtn(i, i, false, i === page);
    } else if (i === page - 2 || i === page + 2) {
      html += `<li class="dots">...</li>`;
    }
  }

  html += pageBtn(page + 1, '→', page === totalPages);

  refs.pagination.innerHTML = html;
}

function pageBtn(p, label, disabled = false, active = false) {
  return `
    <li>
      <button
        class="pagination-btn ${active ? 'active' : ''}"
        data-page="${p}"
        ${disabled ? 'disabled' : ''}>
        ${label}
      </button>
    </li>
  `;
}

function onPaginationClick(e) {
  const btn = e.target.closest('.pagination-btn');
  if (!btn) return;

  const newPage = Number(btn.dataset.page);
  if (newPage === page || newPage < 1) return;

  page = newPage;
  filter ? fetchExercises(false) : fetchFilters(false);
}

refs.exercises.addEventListener('click', e => {
  const btn = e.target.closest('[data-action="start"]');
  if (!btn) return;

  const exercise = localResponse.find(el => el._id === btn.dataset.id);
  if (exercise) handlerStartBtn(exercise);
});

function normalizeFilter(value) {
  return value.toLowerCase() === 'body parts'
    ? 'bodypart'
    : value.toLowerCase();
}

function showNoResults() {
  refs.exercises.innerHTML = `
    <p class="no-results-paragraph">
      Unfortunately, <span>no results</span> were found.
    </p>
  `;
  refs.pagination.innerHTML = '';
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
