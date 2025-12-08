const fullPicture = document.querySelector('.big-picture');
const fullImage = fullPicture.querySelector('.big-picture__img img');
const likesElement = fullPicture.querySelector('.likes-count');
const commentsTotal = fullPicture.querySelector('.comments-count');
const commentsContainer = fullPicture.querySelector('.social__comments');
const pictureDescription = fullPicture.querySelector('.social__caption');

const commentsCounter = fullPicture.querySelector('.social__comment-count');
const loadMoreBtn = fullPicture.querySelector('.comments-loader');

const closeBtn = fullPicture.querySelector('.big-picture__cancel');

let commentsData = [];
let displayedComments = 0;
const COMMENTS_TO_SHOW = 5;

function createCommentElement(comment) {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';

  const avatar = document.createElement('img');
  avatar.className = 'social__picture';
  avatar.src = comment.avatar;
  avatar.alt = comment.name;
  avatar.width = 35;
  avatar.height = 35;

  const text = document.createElement('p');
  text.className = 'social__text';
  text.textContent = comment.message;

  commentElement.appendChild(avatar);
  commentElement.appendChild(text);

  return commentElement;
}

function displayComments() {
  const commentsToShow = commentsData.slice(displayedComments, displayedComments + COMMENTS_TO_SHOW);
  const fragment = document.createDocumentFragment();

  commentsToShow.forEach((comment) => {
    fragment.appendChild(createCommentElement(comment));
  });

  commentsContainer.appendChild(fragment);
  displayedComments += commentsToShow.length;

  commentsCounter.textContent = `${displayedComments} из ${commentsData.length} комментариев`;

  if (displayedComments >= commentsData.length) {
    loadMoreBtn.classList.add('hidden');
  }
}

function openFullPicture(picture) {
  fullImage.src = picture.url;
  fullImage.alt = picture.description;

  likesElement.textContent = picture.likes;
  commentsTotal.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;

  commentsContainer.innerHTML = '';
  commentsData = picture.comments;
  displayedComments = 0;

  commentsCounter.classList.remove('hidden');
  loadMoreBtn.classList.remove('hidden');

  displayComments();

  fullPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onEscapePress);
}

function closeFullPicture() {
  fullPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onEscapePress);
}

function onEscapePress(event) {
  if (event.key === 'Escape') {
    closeFullPicture();
  }
}

loadMoreBtn.addEventListener('click', displayComments);
closeBtn.addEventListener('click', closeFullPicture);

export { openFullPicture };
