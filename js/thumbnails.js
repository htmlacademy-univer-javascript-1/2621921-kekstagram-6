const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document
  .getElementById('picture')
  .content
  .querySelector('.picture');

export const renderThumbnails = (picturesData) => {
  const thumbnailsFragment = document.createDocumentFragment();

  picturesData.forEach((picture) => {
    const thumbnailElement = pictureTemplate.cloneNode(true);

    const imageElement = thumbnailElement.querySelector('.picture__img');
    imageElement.src = picture.url;
    imageElement.alt = picture.description;

    thumbnailElement.querySelector('.picture__likes').textContent = picture.likes;
    thumbnailElement.querySelector('.picture__comments').textContent = picture.comments;

    thumbnailsFragment.appendChild(thumbnailElement);
  });

  picturesContainer.appendChild(thumbnailsFragment);
};
