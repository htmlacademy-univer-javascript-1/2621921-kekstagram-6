import { openBigPicture } from './big-picture.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

export const renderThumbnails = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach((picture) => {
    const thumbnail = pictureTemplate.cloneNode(true);

    const image = thumbnail.querySelector('.picture__img');
    image.src = picture.url;
    image.alt = picture.description;

    thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

    thumbnail.addEventListener('click', () => {
      openBigPicture(picture);
    });

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};
