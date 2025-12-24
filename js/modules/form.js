import { sendData } from '../api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { isEscapeKey } from '../util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('.img-upload__cancel');
const submitBtn = uploadForm.querySelector('.img-upload__submit');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');
const photoPreview = uploadForm.querySelector('.img-upload__preview img');
const effectsPreviews = uploadForm.querySelectorAll('.effects__preview');

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
  const file = fileInput.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    photoPreview.src = URL.createObjectURL(file);
    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${photoPreview.src})`;
    });
  }

  showEditForm();
}

function onCancelClick() {
  hideEditForm();
}

function onFieldKeydown(event) {
  if (event && isEscapeKey(event)) {
    event.stopPropagation();
  }
}

function handleDocumentKeydown(event) {
  if (document.querySelector('.error')) {
    return;
  }

  if (event && isEscapeKey(event) && !event.target.matches('.text__description, .text__hashtags')) {
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
