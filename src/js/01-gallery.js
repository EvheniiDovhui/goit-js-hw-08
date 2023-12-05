// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';
console.log(galleryItems);
const divRef = document.querySelector('.gallery');
function createGalleryMarkup(items) {
  return items
    .map(
      item => `<li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}" />
        </a>
      </li>`
    )
    .join('');
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);
divRef.innerHTML = `<ul class="gallery">${addGalleryMarkup}</ul>`;

function onImgClick(evt) {
  blockStandardAction(evt);

  if (!evt.target.classList.contains('js-gallery-img')) {
    return;
  }

  evt.preventDefault();

  const instance = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" width="800" height="600">`
  );
  instance.show();

  divRef.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      instance.close();
    }
  });
}

function blockStandardAction(evt) {
  evt.preventDefault();
}
const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
