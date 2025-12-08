const pageBody = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeBtn = uploadForm.querySelector('.img-upload__cancel');
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
