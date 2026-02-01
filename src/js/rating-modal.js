import { addExerciseRatingById } from './api.js';

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

const feedback = {
  rate: 0,
  email: '',
  comment: '',
};

const resetForm = () => {
  refs.form.reset();
  feedback.rate = 0;
  refs.ratingValue.textContent = '0.0';
  refs.stars.forEach(star => (star.style.fill = 'var(--white-20)'));
};

refs.closeBtn.onclick = () => refs.backdrop.classList.remove('is-open');

refs.backdrop.onclick = e => {
  if (e.target === refs.backdrop) refs.backdrop.classList.remove('is-open');
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

export const handlerOpenRate = id => {
  exerciseId = id;
  refs.backdrop.classList.add('is-open');
};

refs.form.onsubmit = async e => {
  e.preventDefault();

  feedback.email = refs.email.value.trim();
  feedback.comment = refs.comment.value.trim() || undefined;

  if (!feedback.rate) return alert('Please select a rating');
  if (!feedback.email) return alert('Please enter your email');

  try {
    await addExerciseRatingById(exerciseId, feedback);
    alert('Your rating is accepted');
    resetForm();
    refs.backdrop.classList.remove('is-open');
  } catch ({ message }) {
    alert(`Error: ${message}`);
  }
};
