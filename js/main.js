import { renderMiniatures } from './thumbnails.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { setupForm } from './modules/form.js';
import { initFilters } from './modules/filters.js';
import * as validationModule from './modules/validation.js';
import * as effectsModule from './modules/scale-effect.js';

setupForm(validationModule, effectsModule);

getData()
  .then((pictures) => {
    renderMiniatures(pictures);
    initFilters(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });
