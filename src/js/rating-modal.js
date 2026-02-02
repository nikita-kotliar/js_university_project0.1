import { addExerciseRatingById } from './api.js';
import iziToast from 'izitoast';
import handlerStartBtn from './exercises-modal.js';

const refs = {
  closeBtn: document.getElementById('form-close-btn'),
  backdrop: document.querySelector('.backdrop'),
  form: document.querySelector('.backdrop-form'),
  email: document.getElementById('user-email'),
  comment: document.getElementById('user-comment'),
  ratingWrapper: document.querySelector('.rating-wrapper'),
  ratingValue: document.querySelector('.rating-star-value'),
  stars: document.querySelectorAll('.rating-star-icons'),
};

let exerciseId = null;
let previousExercise = null;

const feedback = {
  rate: 0,
  email: '',
  comment: '',
};

function handleEscClose(e) {
  if (e.key === 'Escape') {
    closeRateModal(true); 
  }
}

const resetForm = () => {
  refs.form.reset();
  feedback.rate = 0;
  refs.ratingValue.textContent = '0.0';
  refs.stars.forEach(star => (star.style.fill = 'var(--white-20)'));
};

function closeRateModal(returnCard = false) {
  refs.backdrop.classList.remove('is-open');
  document.removeEventListener('keydown', handleEscClose);
  if (returnCard && previousExercise) {
    handlerStartBtn(previousExercise);
  }
}

refs.closeBtn.onclick = () => closeRateModal(true);
refs.backdrop.onclick = e => {
  if (e.target === refs.backdrop) closeRateModal(true);
};

refs.ratingWrapper.onclick = ({ target }) => {
  const rate = Number(target.dataset.id);
  if (!rate) return;

  feedback.rate = rate;
  refs.ratingValue.textContent = `${rate}.0`;

  refs.stars.forEach((star, i) => {
    star.style.fill = i < rate ? 'var(--star-color)' : 'var(--white-20)';
  });
};

export const handlerOpenRate = (id, exercise = null) => {
  exerciseId = id;
  previousExercise = exercise;
  refs.backdrop.classList.add('is-open');
  document.addEventListener('keydown', handleEscClose);
};

refs.form.onsubmit = async e => {
  e.preventDefault();

  feedback.email = refs.email.value.trim();
  feedback.comment = refs.comment.value.trim() || undefined;

  if (!feedback.rate) {
    return iziToast.warning({
      title: 'Warning',
      message: 'Please select a rating',
      position: 'topRight',
    });
  }
  if (!feedback.email) {
    return iziToast.warning({
      title: 'Warning',
      message: 'Please enter your email',
      position: 'topRight',
    });
  }

  try {
    await addExerciseRatingById(exerciseId, feedback);
    iziToast.success({
      title: 'Success',
      message: 'Your rating is accepted',
      position: 'topRight',
    });
    resetForm();
    closeRateModal(); 
  } catch ({ message }) {
    iziToast.error({
      title: 'Error',
      message: message,
      position: 'topRight',
    });
  }
};
