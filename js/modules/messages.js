import { isEscapeKey } from '../util.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

function showMessage(template, closeButtonClass) {
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const closeButton = messageElement.querySelector(closeButtonClass);

  function closeMessage() {
    messageElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  }

  function onDocumentClick(evt) {
    if (evt.target === messageElement || evt.target === closeButton) {
      closeMessage();
    }
  }

  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
}

function showSuccessMessage() {
  showMessage(successTemplate, '.success__button');
}

function showErrorMessage() {
  showMessage(errorTemplate, '.error__button');
}

export { showSuccessMessage, showErrorMessage };
