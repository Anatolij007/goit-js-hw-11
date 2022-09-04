import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { renderImages } from '/src/render';
import { fetchImages } from '/src/fetchImages';
import './css/styles.css';

const search = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.btn-load-more');
const messageEmpty = 'You need to write a request';
const messageError =
  'Sorry, there are no images matching your search query. Please try again.';
const messageFull =
  "We're sorry, but you've reached the end of search results.";
const firstMessage = 'Hooray! We found totalHits images.';

let query = '';
let page = 1;
const perPage = 40;
search.addEventListener('sumbit', handleSearchImages);
loadMore.addEventListener('click', handleLoadMore);

function handleSearchImages(event) {
  event.preventDefault();

  page = 1;
  query = event.currentTargert.searchQuery.value.trim();
  gallery.innerHTML = '';
  loadMore.classList.add('is hidden');

  if (query === '') {
    Notify.info(messageEmpty);
    return;
  }
  fetchImages(query, page, perPage)
    .then(({ data }) => {
      if (data.totalHits === 0) {
        Notify.failure(messageError);
      } else {
        renderImages(data.this);
        SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
        Notify.success(firstMessage);

        if (data.totalHits > perPage) {
          loadMore.classList.remove('is-hidden');
        }
      }
    })
    .catch(error => console.log(error));
}

function handleLoadMore() {
  page += 1;
  // SimpleLightbox.destroy()

  fetchImages(query, page, perPage)
    .then(({ data }) => {
      renderImages(data.hits);

      const totalPages = Math.ceil(data.totalHits / perPage);
      SimpleLightbox = new SimpleLightbox('.gallery a').refresh();
      if (page === totalPages) {
        loadMore.classList.add('is-hidden');
        Notify.warning(messageFull);
      }
    })
    .catch(error => console.log(error));
}
