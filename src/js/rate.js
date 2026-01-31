export async function addExerciseRatingById(id, { email, rate, comment }) {
  const url = `https://your-energy.b.goit.study/api/exercises/${id}/rating`;
  rate = Number(rate);

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      rate,
      review: comment,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Rating failed');
  }

  return response.json();
}

const formCloseBtn = document.getElementById('form-close-btn');
const backdrop = document.querySelector('.backdrop');
const userEmail = document.querySelector('#user-email');
const userComment = document.getElementById('user-comment');
const formSendBtn = document.querySelector('.form-send-btn');
const ratingWrapper = document.querySelector('.rating-wrapper');
const ratingStarValue = document.querySelector('.rating-star-value');
const backdropForm = document.querySelector('.backdrop-form');

let exerciseId = null;
const userFeedback = {
  rate: 0,
  email: '',
  comment: '',
};

formSendBtn.disabled = false;

function resetForm() {
  userEmail.value = '';
  userComment.value = '';
  userFeedback.rate = 0;
  userFeedback.comment = '';
  userFeedback.email = '';

  ratingStarValue.textContent = '0.0';

  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  ratingStarIcons.forEach(icon => {
    icon.style.fill = 'var(--white-20)';
  });
}

formCloseBtn.addEventListener('click', () => {
  backdrop.classList.remove('is-open');
});

backdrop.addEventListener('click', event => {
  if (event.target === backdrop) backdrop.classList.remove('is-open');
});

ratingWrapper.addEventListener('click', event => {
  const ratingStarIcons = document.querySelectorAll('.rating-star-icons');
  if (!event.target.dataset.id) return;

  userFeedback.rate = Number(event.target.dataset.id);

  for (let i = 0; i < 5; i++) {
    ratingStarIcons[i].style.fill =
      i < userFeedback.rate ? 'var(--star-color)' : 'var(--white-20)';
  }

  ratingStarValue.textContent = `${userFeedback.rate}.0`;
});

export function handlerOpenRate(id) {
  exerciseId = id;
  backdrop.classList.add('is-open');
}

backdropForm.addEventListener('submit', handlerAddRate);

async function handlerAddRate(event) {
  event.preventDefault();
  userFeedback.email = userEmail.value.trim();
  userFeedback.comment = userComment.value.trim() || undefined;

  if (!userFeedback.rate) {
    alert('Please select a rating');
    return;
  }

  if (!userFeedback.email) {
    alert('Please enter your email');
    return;
  }

  try {
    await addExerciseRatingById(exerciseId, userFeedback);
    alert('Your rating is accepted');
    resetForm();
    backdrop.classList.remove('is-open');
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}
