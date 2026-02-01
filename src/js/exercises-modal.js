import { isFavorite, toggleFavorite } from './LS.js';
import { checkStorage } from './favouriteEx';
import { handlerOpenRate } from './rating-modal';

const cardBackdrop = document.querySelector('.exr-card-backdrop');

const capitalizeFirstLetter = str =>
  `${str.charAt(0).toUpperCase()}${str.slice(1)}`;

export default function handlerStartBtn(exercise, isFav = false) {
  const favourite = isFav || isFavorite(exercise._id);

  renderModal(exercise, favourite);

  cardBackdrop.classList.add('card-is-open');
  document.body.classList.add('not-scrollable');
}

function renderModal(data, initialFavourite) {
  let isFavourite = initialFavourite;

  cardBackdrop.innerHTML = `
    <div class="exr-card-cont">
      <button name="close" id="close-card" type="button" class="close-card-button">
      <svg class="close-card-icon"">
        <use href="/iconic.svg#icon-x"></use>
      </svg>
      </button>
      <img src="${data.gifUrl}" alt="example-img" class="exr-image" />
      <div>
      <h3 class="exercise-name">${capitalizeFirstLetter(data.name)}</h3>
      <div class="rating-container">
        <ul class="star-rating-list">
          <li>
            <p class="rating-score">${data.rating}</p>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
          <li>
            <svg class="star-rating-icon" width="14px" height="14px">
              <use href="/iconic.svg#icon-star"></use>
            </svg>
          </li>
        </ul>
      </div>
      <div class="exr-information-container">
        <div class="exr-info-block">
          <p class="info-label">Target</p>
          <p class="exr-info" id="exr-target">${capitalizeFirstLetter(
            data.target
          )}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Body Part</p>
          <p class="exr-info" id="body-part">${capitalizeFirstLetter(
            data.bodyPart
          )}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Equipment</p>
          <p class="exr-info" id="exr-equip">${capitalizeFirstLetter(
            data.equipment
          )}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Popular</p>
          <p class="exr-info" id="exr-popularity">${data.popularity}</p>
        </div>
        <div class="exr-info-block">
          <p class="info-label">Burned Calories</p>
          <p class="exr-info" id="burned-cal">${data.burnedCalories}/${data.time} min</p>
        </div>
      </div>
      <p class="exr-description">${data.description}</p>
      <div class="buttons-cont">
        <button name="add-favorurite" class="add-favourite-btn">
          ${isFavourite ? 'Remove from' : 'Add to favourites'}
          <svg class="heart-icon" width="20px" height="20px">
            <use href="/iconic.svg#icon-heart"></use>
          </svg>
        </button>
        <button name="rating" class="give-rating-btn">Give a rating</button>
      </div>
    </div>`;

  paintStars(data.rating);

  const favBtn = document.querySelector('.add-favourite-btn');
  favBtn.addEventListener('click', () => {
    isFavourite = toggleFavorite(data);
    console.log(isFavourite);
    favBtn.innerHTML = `
    ${isFavourite ? 'Remove from' : 'Add to favourites'}
    <svg class="heart-icon" width="20" height="20">
      <use href="/iconic.svg#icon-heart"></use>
    </svg>
  `;

    checkStorage();
  });


  document.getElementById('close-card').onclick = closeModal;
  cardBackdrop.onclick = e => e.target === cardBackdrop && closeModal();

  document.querySelector('.give-rating-btn').onclick = () => {
    closeModal();
    handlerOpenRate(data._id);
  };
}

function closeModal() {
  cardBackdrop.classList.remove('card-is-open');
  document.body.classList.remove('not-scrollable');
}

function paintStars(rating) {
  document.querySelectorAll('.star-rating-icon').forEach((star, i) => {
    if (i < Math.round(rating)) star.style.fill = '#eea10c';
  });
}
