const pageBody = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeBtn = uploadForm.querySelector('.img-upload__cancel');
const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

let validationInstance;

function openEditForm() {
  editOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', handleKeydown);
}

function closeEditForm() {
  editOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', handleKeydown);
  clearFormData();
}

function clearFormData() {
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
}

function onFileSelected() {
  openEditForm();
}

function onCloseClicked() {
  closeEditForm();
}

function onInputKeydown(event) {
function onFileChange() {
  showEditForm();
}

function onCancelClick() {
  hideEditForm();
}

function onFieldKeydown(event) {
  if (event.key === 'Escape') {
    event.stopPropagation();
  }
}

function handleKeydown(event) {
  if (event.key === 'Escape' && !event.target.matches('.text__description, .text__hashtags')) {
    closeEditForm();
  }
}

function onSubmitForm(event) {
function handleDocumentKeydown(event) {
  if (event.key === 'Escape' && !event.target.matches('.text__description, .text__hashtags')) {
    hideEditForm();
  }
}

function onFormSubmit(event) {
  event.preventDefault();

  if (validationInstance.validate()) {
    uploadForm.submit();
  }
}

function initUploadForm(validationModule, effectsModule) {
  validationInstance = validationModule.initValidation(uploadForm);

  if (effectsModule) {
    effectsModule.setupScaleEffects();
  }

  fileInput.addEventListener('change', onFileSelected);
  closeBtn.addEventListener('click', onCloseClicked);
  commentInput.addEventListener('keydown', onInputKeydown);
  hashtagInput.addEventListener('keydown', onInputKeydown);
  uploadForm.addEventListener('submit', onSubmitForm);
}

export { initUploadForm, closeEditForm, clearFormData };
function setupForm(validationModule) {
  validationInstance = validationModule.initValidation(uploadForm);

  fileInput.addEventListener('change', onFileChange);
  cancelBtn.addEventListener('click', onCancelClick);
  commentInput.addEventListener('keydown', onFieldKeydown);
  hashtagInput.addEventListener('keydown', onFieldKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
}

export { setupForm };
