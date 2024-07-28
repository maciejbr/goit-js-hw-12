import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let currentQuery = '';

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: '250',
  overlayOpacity: 0.8,
});

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

function onSearch(event) {
  event.preventDefault();
  currentQuery = event.target.elements.query.value.trim();

  if (!currentQuery) {
    iziToast.error({
      message:
        'Sorry, you have to type something in the search field. Please try again!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  showLoader();
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  fetchImagesAndRender(currentQuery, page);
  form.reset();
}

async function fetchImagesAndRender(query, page) {
  showLoader();

  try {
    const images = await fetchImages(query, page);
    hideLoader();

    if (images.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    renderGallery(images.hits);

    if (!lightBox) {
      lightBox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    } else {
      lightBox.refresh();
    }

    if (images.hits.length < 40) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      loadMoreBtn.classList.add('hidden');
    } else {
      loadMoreBtn.classList.remove('hidden');
    }

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    hideLoader();
    iziToast.error();
  }
}

function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img class="gallery-image" src="${webformatURL}" alt="${tags}">
          </a>
          <div class="image-stats">
            <ul class="image-stats-list">
              <li class="image-stats-item">
                <p class="image-stats-title">Likes</p>
                <p class="image-stats-text">${likes}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Views</p>
                <p class="image-stats-text">${views}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Comments</p>
                <p class="image-stats-text">${comments}</p>
              </li>
              <li class="image-stats-item">
                <p class="image-stats-title">Downloads</p>
                <p class="image-stats-text">${downloads}</p>
              </li>
            </ul>
          </div>
        </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}

function showLoader() {
  loader.classList.add('active');
}

function hideLoader() {
  loader.classList.remove('active');
}

function loadMoreImages() {
  page += 1;
  fetchImagesAndRender(currentQuery, page);
}
