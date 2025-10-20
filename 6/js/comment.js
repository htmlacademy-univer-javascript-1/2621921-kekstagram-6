import { getRandomInteger, getRandomArrayElement, createIdGenerator } from './utils.js';
import { MESSAGES, NAMES } from './data.js';

const generateCommentId = createIdGenerator();

export const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES)
});
