// 03-feedback.js
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

function saveFormState() {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.setItem(storageKey, JSON.stringify(formData));
}

function restoreFormState() {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    emailInput.value = parsedState.email || '';
    messageInput.value = parsedState.message || '';
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formData);

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';
}

form.addEventListener('input', throttle(saveFormState, 500));
document.addEventListener('DOMContentLoaded', restoreFormState);
form.addEventListener('submit', handleSubmit);
