import { generatePhotos } from './data.js';

const photos = generatePhotos();

export { photos };

import { renderThumbnails } from './thumbnails.js';
import { pictures } from './mock-data.js';

renderThumbnails(pictures);
import { picturesData } from './mock.js';
import { renderMiniatures } from './thumbnails.js';

renderMiniatures(picturesData);
