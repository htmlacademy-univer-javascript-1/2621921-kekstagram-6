const COMMENTS_PER_PORTION = 5;

let commentsShown = 0;
let comments = [];

const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImage = bigPictureContainer.querySelector('.big-picture__img img');
const likesCounter = bigPictureContainer.querySelector('.likes-count');
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

function renderComments() {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoaderBtn.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoaderBtn.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const comment = comments[i];
    const commentElement = createCommentElement(comment);
    fragment.append(commentElement);
  }

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
  commentCounterBlock.innerHTML = `<span class="social__comment-shown-count">${commentsShown}</span> из <span class="social__comment-total-count">${comments.length}</span> комментариев`;
}

function onCommentsLoaderClick() {
  renderComments();
}

function openPictureModal(photoData) {
  bigPictureImage.src = photoData.url;
  bigPictureImage.alt = photoData.description;

  likesCounter.textContent = photoData.likes;
  pictureDescription.textContent = photoData.description;

  comments = photoData.comments;
  if (comments.length > 0) {
    commentsShown = 0;
    renderComments();
  } else {
    commentsContainer.innerHTML = '';
    commentsLoaderBtn.classList.add('hidden');
    commentCounterBlock.innerHTML = '<span class="social__comment-shown-count">0</span> из <span class="social__comment-total-count">0</span> комментариев';
  }

  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapeKeydown);
}

function closePictureModal() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapeKeydown);
  commentsShown = 0;
}

function onEscapeKeydown(event) {
  if (event.key === 'Escape') {
    closePictureModal();
  }
}

closeBtn.addEventListener('click', closePictureModal);
commentsLoaderBtn.addEventListener('click', onCommentsLoaderClick);

export { openPictureModal };
