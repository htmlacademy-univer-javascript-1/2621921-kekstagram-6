import { renderMiniatures } from '../thumbnails.js';
import { debounce } from '../util.js';

const RANDOM_PICTURES_COUNT = 10;
const RERENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filtersFormElement = filtersElement.querySelector('.img-filters__form');

let pictures = [];

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const showFilters = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
};

const compareComments = (pictureA, pictureB) => {
  const rankA = pictureA.comments.length;
  const rankB = pictureB.comments.length;

  return rankB - rankA;
};

const filterPictures = (filterType) => {
  switch (filterType) {
    case FilterType.RANDOM:
      return [...pictures].sort(() => 0.5 - Math.random()).slice(0, RANDOM_PICTURES_COUNT);
    case FilterType.DISCUSSED:
      return [...pictures].sort(compareComments);
    default:
      return [...pictures];
  }
};

const setActiveFilterButton = (clickedButton) => {
  const currentActiveButton = filtersFormElement.querySelector('.img-filters__button--active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('img-filters__button--active');
  }
  clickedButton.classList.add('img-filters__button--active');
};

const debouncedRender = debounce((filterId) => {
  const filteredPictures = filterPictures(filterId);
  renderMiniatures(filteredPictures);
}, RERENDER_DELAY);

const onFilterClick = (evt) => {
  const clickedButton = evt.target;
  if (!clickedButton.classList.contains('img-filters__button')) {
    return;
  }

  setActiveFilterButton(clickedButton);
  debouncedRender(clickedButton.id);
};

const initFilters = (loadedPictures) => {
  showFilters(loadedPictures);
  filtersFormElement.addEventListener('click', onFilterClick);
};

export { initFilters };
