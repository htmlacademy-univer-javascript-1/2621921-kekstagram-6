export const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createIdGenerator = () => {
  let lastId = 0;
  return () => ++lastId;
};

export const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];
