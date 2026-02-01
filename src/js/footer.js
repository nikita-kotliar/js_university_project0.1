import { postSubscriptions } from './api.js';

const email = document.querySelector('input[name=email]');
const submitBtnFooter = document.querySelector('.footer-send-button');
const STORAGE_KEY = 'feedback-form-state';

const saveToLocalStorage = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ email: email.value }));
};

const loadFromLocalStorage = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return;

  const { email: savedEmail } = JSON.parse(data);
  email.value = savedEmail || '';
  submitBtnFooter.disabled = !email.value;
};

loadFromLocalStorage();

email.addEventListener('input', () => {
  saveToLocalStorage();
  submitBtnFooter.disabled = !email.value;
});

submitBtnFooter.addEventListener('click', async e => {
  e.preventDefault();
  if (!email.value) return;

  try {
    await postSubscriptions(email.value);

    alert('Success! Welcome to energy.flow world!');
    email.value = '';
    submitBtnFooter.disabled = true;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      alert('Email already exists');
    } else {
      alert('Something went wrong! Please try again later');
    }
  }
});
