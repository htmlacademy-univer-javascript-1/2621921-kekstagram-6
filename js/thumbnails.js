import { openPictureModal } from './big-picture.js';

const picturesContainerElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderMiniatures = (photos) => {
  const existingPictures = picturesContainerElement.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    const pictureImage = pictureElement.querySelector('.picture__img');
    pictureImage.src = photo.url;
    pictureImage.alt = photo.description;

    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureElement.addEventListener('click', () => {
      openPictureModal(photo);
    });

    fragment.appendChild(pictureElement);
  });

  picturesContainerElement.appendChild(fragment);
};

export { renderMiniatures };
