import { postSubscriptions } from './api.js';
import iziToast from 'izitoast'; 

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

    iziToast.success({
      title: 'Success',
      message: 'Welcome to energy.flow world!',
      position: 'topRight',
    });

    email.value = '';
    submitBtnFooter.disabled = true;
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      iziToast.warning({
        title: 'Warning',
        message: 'Email already exists',
        position: 'topRight',
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong! Please try again later',
        position: 'topRight',
      });
    }
  }
});
