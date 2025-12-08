const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const likesCounter = bigPictureContainer.querySelector('.likes-count');
const commentsCounter = bigPictureContainer.querySelector('.comments-count');
const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const pictureDescription = bigPictureContainer.querySelector('.social__caption');

const commentCounterBlock = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoaderBtn = bigPictureContainer.querySelector('.comments-loader');

const closeBtn = bigPictureContainer.querySelector('.big-picture__cancel');

function createCommentElement(commentData) {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = commentData.avatar;
  commentImage.alt = commentData.name;
  commentImage.width = 35;
  commentImage.height = 35;

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = commentData.message;

  commentItem.appendChild(commentImage);
  commentItem.appendChild(commentText);

  return commentItem;
}

function openPictureModal(photoData) {
  bigPictureImage.src = photoData.url;
  bigPictureImage.alt = photoData.description;

  likesCounter.textContent = photoData.likes;
  commentsCounter.textContent = photoData.comments.length;
  pictureDescription.textContent = photoData.description;

  commentsContainer.innerHTML = '';

  photoData.comments.forEach((item) => {
    commentsContainer.appendChild(createCommentElement(item));
  });

  commentCounterBlock.classList.add('hidden');
  commentsLoaderBtn.classList.add('hidden');

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeydown);
}

function closePictureModal() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
}

function onEscapeKeydown(event) {
  if (event.key === 'Escape') {
    closePictureModal();
  }
}

closeBtn.addEventListener('click', closePictureModal);

export { openPictureModal };
