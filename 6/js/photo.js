import { getRandomInteger, createIdGenerator } from './utils.js';
import { createComment } from './comment.js';

const generatePhotoId = createIdGenerator();

export const createPhoto = () => {
  const photoId = generatePhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: 'Красивый момент из жизни',
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
  };
};

export const generatePhotos = (count = 25) => Array.from({length: count}, createPhoto);
