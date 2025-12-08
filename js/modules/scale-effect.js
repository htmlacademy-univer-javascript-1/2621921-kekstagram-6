const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const FILTERS = {
  none: {
    name: 'none',
    unit: '',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  chrome: {
    name: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    name: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    name: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    name: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
    name: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

const scaleValue = document.querySelector('.scale__control--value');
const scaleDownBtn = document.querySelector('.scale__control--smaller');
const scaleUpBtn = document.querySelector('.scale__control--bigger');
const imageElement = document.querySelector('.img-upload__preview img');
const effectsContainer = document.querySelector('.effects__list');
const effectSliderContainer = document.querySelector('.effect-level');
const effectValueInput = document.querySelector('.effect-level__value');
const effectSliderElement = document.querySelector('.effect-level__slider');

let currentScale = DEFAULT_SCALE;
let selectedFilter = 'none';
let sliderInstance = null;

function updateScaleDisplay() {
  scaleValue.value = `${currentScale}%`;
  const scaleFactor = currentScale / 100;
  imageElement.style.transform = `scale(${scaleFactor})`;
}

function decreaseScale() {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScaleDisplay();
  }
}

function increaseScale() {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScaleDisplay();
  }
}

function resetScale() {
  currentScale = DEFAULT_SCALE;
  updateScaleDisplay();
}

function initializeSlider() {
  if (sliderInstance) {
    sliderInstance.destroy();
  }

  if (selectedFilter === 'none') {
    effectSliderContainer.classList.add('hidden');
    imageElement.style.filter = 'none';
    return;
  }

  effectSliderContainer.classList.remove('hidden');

  const { min, max, step, start } = FILTERS[selectedFilter];

  sliderInstance = noUiSlider.create(effectSliderElement, {
    range: {
      min,
      max
    },
    start,
    step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
      from: (value) => parseFloat(value)
    }
  });

  sliderInstance.on('update', () => {
    const sliderValue = sliderInstance.get();
    effectValueInput.value = sliderValue;
    applyFilterEffect(sliderValue);
  });
}

function applyFilterEffect(value) {
  const { name, unit } = FILTERS[selectedFilter];

  if (selectedFilter === 'none') {
    imageElement.style.filter = 'none';
  } else {
    imageElement.style.filter = `${name}(${value}${unit})`;
  }
}

function handleEffectChange(event) {
  if (event.target.type === 'radio') {
    selectedFilter = event.target.value;
    initializeSlider();
  }
}

function resetFilters() {
  selectedFilter = 'none';
  const originalEffect = effectsContainer.querySelector('#effect-none');
  if (originalEffect) {
    originalEffect.checked = true;
  }
  initializeSlider();
}

function setupScaleEffects() {
  updateScaleDisplay();

  scaleDownBtn.addEventListener('click', decreaseScale);
  scaleUpBtn.addEventListener('click', increaseScale);

  effectsContainer.addEventListener('change', handleEffectChange);

  initializeSlider();
}

function cleanupScaleEffects() {
  scaleDownBtn.removeEventListener('click', decreaseScale);
  scaleUpBtn.removeEventListener('click', increaseScale);
  effectsContainer.removeEventListener('change', handleEffectChange);

  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }

  resetScale();
  resetFilters();
}

export { setupScaleEffects, cleanupScaleEffects, resetScale, resetFilters };
