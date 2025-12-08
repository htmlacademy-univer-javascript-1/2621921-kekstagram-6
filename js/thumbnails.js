const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (data) => {
  const thumbnail = pictureTemplate.cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  image.src = data.url;
  image.alt = data.description;

  thumbnail.querySelector('.picture__likes').textContent = data.likes;
  thumbnail.querySelector('.picture__comments').textContent = data.comments.length;

  return thumbnail;
};

const renderThumbnails = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbnails };

