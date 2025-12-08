import { generatePhotos } from './data.js';

const photos = generatePhotos();

export { photos };

import { renderThumbnails } from './thumbnails.js';
import { pictures } from './mock.js';

renderThumbnails(pictures);
