import { sendData } from '../api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { isEscapeKey } from '../util.js';

const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('.img-upload__cancel');
const submitBtn = uploadForm.querySelector('.img-upload__submit');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

let validationInstance;
let effectsModuleRef;

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = SubmitButtonText.IDLE;
};

function showEditForm() {
  editForm.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', handleDocumentKeydown);
}

function hideEditForm() {
  editForm.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', handleDocumentKeydown);
  clearForm();
}

function clearForm() {
  uploadForm.reset();
  fileInput.value = '';

  if (validationInstance) {
    validationInstance.reset();
  }

  if (effectsModuleRef) {
    effectsModuleRef.resetScale();
    effectsModuleRef.resetFilters();
  }
}

function onFileChange() {
  showEditForm();
}

function onCancelClick() {
  hideEditForm();
}

function onFieldKeydown(event) {
  if (isEscapeKey(event)) {
    event.stopPropagation();
  }
}

function handleDocumentKeydown(event) {
  if (document.querySelector('.error')) {
    return;
  }
  
  if (isEscapeKey(event) && !event.target.matches('.text__description, .text__hashtags')) {
    hideEditForm();
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (validationInstance.validate()) {
    blockSubmitButton();
    sendData(new FormData(event.target))
      .then(() => {
        hideEditForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
}

function setupForm(validationModule, effectsModule) {
  validationInstance = validationModule.initValidation(uploadForm);
  effectsModuleRef = effectsModule;

  if (effectsModule) {
    effectsModule.setupScaleEffects();
  }

  fileInput.addEventListener('change', onFileChange);
  cancelBtn.addEventListener('click', onCancelClick);
  commentInput.addEventListener('keydown', onFieldKeydown);
  hashtagInput.addEventListener('keydown', onFieldKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
}

export { setupForm };
