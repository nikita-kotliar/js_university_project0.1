import handlerStartBtn from './exercises-modal.js';
import { loadFavorites, removeFavoriteById } from './LS.js';
import { renderExercises } from './exercise.js';
import { renderQuoteHTML } from './quote.js';

const refs = {
  root: document.querySelector('.container-fav'),
  quote: document.querySelector('.quote'),
};

let page = 1;
const CARDS_PER_PAGE = 8;
const DESKTOP_BREAKPOINT = 1140;


const paginate = (arr, page) =>
  arr.slice((page - 1) * CARDS_PER_PAGE, page * CARDS_PER_PAGE);

const uniqueById = arr =>
  arr.filter(
    (item, index, self) => index === self.findIndex(el => el._id === item._id)
  );

function renderPagination(totalPages) {
  if (totalPages <= 1) return '';

  let html = `<ul class="pagination">`;

  html += pageBtn(page - 1, '←', page === 1);

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      html += pageBtn(i, i, false, i === page);
    } else if (i === page - 2 || i === page + 2) {
      html += `<li class="dots">...</li>`;
    }
  }

  html += pageBtn(page + 1, '→', page === totalPages);
  html += `</ul>`;

  return html;
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

export function checkStorage() {
  if (!refs.root) return;

  const favorites = uniqueById(loadFavorites());
  const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;

  if (!favorites.length) {
    refs.root.innerHTML = `
      <p class="no_cards_wrapper">
        You haven't added any exercises to your favorites yet.
      </p>
    `;
    return;
  }

  const totalPages = Math.ceil(favorites.length / CARDS_PER_PAGE);
  if (page > totalPages) page = totalPages;

  const cards = isDesktop ? favorites : paginate(favorites, page);

  refs.root.innerHTML = `
    <ul class="fav_card_list">
      ${renderExercises(cards, true)}
    </ul>
    ${!isDesktop ? renderPagination(totalPages) : ''}
  `;
}

refs.root?.addEventListener('click', e => {
  const delBtn = e.target.closest('[data-action="delete"]');
  const startBtn = e.target.closest('[data-action="start"]');
  const pageBtnEl = e.target.closest('.pagination-btn');

  if (delBtn) {
    removeFavoriteById(delBtn.dataset.id);
    checkStorage();
  }

  if (startBtn) {
    const exercise = loadFavorites().find(el => el._id === startBtn.dataset.id);
    if (exercise) handlerStartBtn(exercise, true);
  }

  if (pageBtnEl) {
    const newPage = Number(pageBtnEl.dataset.page);
    if (newPage === page || newPage < 1) return;

    page = newPage;
    checkStorage();
  }
});

window.addEventListener('resize', () => {
  page = 1;
  checkStorage();
});

checkStorage();
renderQuoteHTML(refs.quote);
