// Генерация случайного числа в диапазоне
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Создание генератора уникальных ID
const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();

// Данные для комментариев
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.'
];

const NAMES = ['Артём', 'Мария', 'Дмитрий', 'Анна', 'Сергей', 'Елена', 'Алексей', 'Ольга', 'Иван', 'Наталья'];

// Получение случайного элемента массива
const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

// Создание комментария
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});

// Создание фотографии
const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: 'Красивый момент из жизни',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

// Генерация массива фотографий
const generatePhotos = () => Array.from({length: 25}, createPhoto);

// Создаем массив фотографий
const photos = generatePhotos();

// Функции для отрисовки миниатюр
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

const renderThumbnails = (photosData) => {
  const fragment = document.createDocumentFragment();

  photosData.forEach((photo) => {
    const thumbnail = createThumbnail(photo);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

// Отображение фотографий при загрузке страницы
const renderPhotos = () => {
  renderThumbnails(photos);
};

// Инициализация
const init = () => {
  renderPhotos();
};

// Запуск при полной загрузке DOM
document.addEventListener('DOMContentLoaded', init);

// Для отладки выводим в консоль
console.log(photos);
