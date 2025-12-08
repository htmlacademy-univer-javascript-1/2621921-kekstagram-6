const pageBody = document.body;

function openModal(modalElement) {
  modalElement.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  document.addEventListener('keydown', handleKeydown);
}

function closeModal(modalElement) {
  modalElement.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', handleKeydown);
}

function handleKeydown(event) {
  if (event.key === 'Escape') {
    const openModalElement = document.querySelector('.modal:not(.hidden)');
    if (openModalElement) {
      closeModal(openModalElement);
    }
  }
}

export { closeModal, openModal };
