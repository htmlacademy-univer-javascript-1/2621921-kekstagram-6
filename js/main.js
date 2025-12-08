
import { renderThumbnails } from './thumbnails.js';
import { pictures } from './mock.js';

const photoCollection = generatePhotos();

renderThumbnails(pictures);

export { photoCollection as photos };
