const bodyElement = document.body;
const uploadForm = document.querySelector('.img-upload__form');
const fileInput = uploadForm.querySelector('.img-upload__input');
const editForm = uploadForm.querySelector('.img-upload__overlay');
const cancelBtn = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagInput = uploadForm.querySelector('.text__hashtags');

let validationInstance;

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

function setupForm(validationModule) {
  validationInstance = validationModule.initValidation(uploadForm);

  fileInput.addEventListener('change', onFileChange);
  cancelBtn.addEventListener('click', onCancelClick);
  commentInput.addEventListener('keydown', onFieldKeydown);
  hashtagInput.addEventListener('keydown', onFieldKeydown);
  uploadForm.addEventListener('submit', onFormSubmit);
}

export { setupForm };
