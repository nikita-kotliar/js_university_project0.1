import handlerStartBtn from './exercises_card.js';
import {
  getFav,
  removeFromFav,
  LS_FAV,
  displayQuote,
} from './localalStorageLogical.js';

/* ================= REFS ================= */
const refs = {
  root: document.querySelector('.scrollbar_custom'),
  quoteContainer: document.querySelector('.quote'),
};

/* ================= STATE ================= */
let page = 1;
const CARDS_PER_PAGE = 8;

/* ================= HELPERS ================= */
const getCardsByPage = (arr, page) => {
  const start = (page - 1) * CARDS_PER_PAGE;
  return arr.slice(start, start + CARDS_PER_PAGE);
};

const uniqueIdFilter = (arr = []) => {
  const ids = new Set();
  return arr.filter(el => {
    if (!el?._id || ids.has(el._id)) return false;
    ids.add(el._id);
    return true;
  });
};

/* ================= MARKUP ================= */
function renderNoCards() {
  refs.root.innerHTML = `
    <div class="no_cards_wrapper-container">
      <p class="no_cards_wrapper">
        It appears that you haven't added any exercises to your favorites yet.
        To get started, you can add exercises that you like to your favorites
        for easier access in the future.
      </p>
    </div>
  `;
}

function renderCards(cards) {
  return `
    <ul class="fav_card_list">
      ${cards
        .map(({ name, _id, burnedCalories, bodyPart, target, time = 3 }) => {
          let calories = `${burnedCalories} / ${time} min`;

          return `
            <li class="exercise-information" data-id-card="${_id}">
              <div class="top-nav">
                <div>
                  <p class="tag">Workout</p>
                  <button
                    data-action="delete"
                    data-id="${_id}"
                    class="trash-btn">
                    <svg width="16" height="16">
                      <use href="/js_university_project0.1/symbol-defs.svg#icon-trash"></use>
                    </svg>
                  </button>
                </div>

                <button
                  data-action="start"
                  data-id="${_id}"
                  class="details-link">
                  Start
                  <svg width="16" height="16">
                    <use href="/js_university_project0.1/symbol-defs.svg#icon-arrow"></use>
                  </svg>
                </button>
              </div>

              <div class="exercise-header">
                <svg width="24" height="24">
                  <use href="/js_university_project0.1/symbol-defs.svg#icon-run"></use>
                </svg>
                <h2 class="exercise-name">${name}</h2>
              </div>

              <ul class="exercise-details">
                <li><span>Burned calories:</span> ${calories}</li>
                <li><span>Body part:</span> ${bodyPart}</li>
                <li><span>Target:</span> ${target}</li>
              </ul>
            </li>
          `;
        })
        .join('')}
    </ul>
  `;
}

function renderPagination(totalPages) {
  if (totalPages <= 1) return '';

  let html = '<ul class="nav-buttons pagination">';

  const btn = p => `
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
    html += btn(1);
    if (start > 2) html += `<li class="dots">...</li>`;
  }

  for (let i = start; i <= end; i++) html += btn(i);

  if (end < totalPages) {
    if (end < totalPages - 1) html += `<li class="dots">...</li>`;
    html += btn(totalPages);
  }

  html += '</ul>';
  return html;
}

export function checkStorage() {
  if (!refs.root) return;

  const favs = uniqueIdFilter(getFav(LS_FAV) || []);

  if (!favs.length) {
    renderNoCards();
    return;
  }

  const totalPages = Math.ceil(favs.length / CARDS_PER_PAGE);
  if (page > totalPages) page = totalPages;

  const cards = window.innerWidth < 1440 ? getCardsByPage(favs, page) : favs;

  refs.root.innerHTML =
    renderCards(cards) +
    (window.innerWidth < 1440 ? renderPagination(totalPages) : '');
}

refs.root?.addEventListener('click', e => {
  const del = e.target.closest('[data-action="delete"]');
  const start = e.target.closest('[data-action="start"]');
  const pageBtn = e.target.closest('.pagination-btn');

  if (del) {
    removeFromFav(del.dataset.id);
    checkStorage();
  }

  if (start) {
    const favs = getFav(LS_FAV) || [];
    const exercise = favs.find(el => el._id === start.dataset.id);
    if (exercise) handlerStartBtn(exercise, true, true);
  }

  if (pageBtn) {
    const newPage = Number(pageBtn.dataset.page);
    if (newPage !== page) {
      page = newPage;
      checkStorage();
    }
  }
});

window.addEventListener('resize', () => {
  page = 1;
  checkStorage();
});

checkStorage();
displayQuote(refs.quoteContainer);
