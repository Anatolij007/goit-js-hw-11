// import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// import { renderList } from '/src/render';
import './css/styles.css';
import articlesTpl from './articles.hbs';
import ImagesApiService from './images-service';
import LoadMoreBtn from './load-more-btn';
import { Notify } from 'notiflix';

const refs = {
  search: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  // body: document.querySelector('body'),
  // loadMore: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const imagesApiService = new ImagesApiService();

refs.search.addEventListener('submit', handleSearch);
// refs.loadMore.addEventListener('click', handleLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchArticlesGroup);
// refs.gallery.addEventListener('scroll', handleScroll);

// function handleScroll(e) {
//   if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
//     loadMoreBtn.show();
//     fetchArticlesGroup();
//   }
//   console.log(e.target);
// }

// function renderList(data) {
//   const markup = data
//     .map(
//       ({
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card">
//   <a href="${largeImageURL}">
//     <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//     <div class="info">
//       <p class="info-item">
//         <b>Likes</b>${likes}
//       </p>
//       <p class="info-item">
//         <b>Views</b>${views}
//       </p>
//       <p class="info-item">
//         <b>Comments</b>${comments}
//       </p>
//       <p class="info-item">
//         <b>Downloads</b>${downloads}
//       </p>
//     </div>
//   </a>
// </div>`;
//       }
//     )
//     .join('');

//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

function renderGallery(data) {
  const markup = renderList(data);
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// function renderList(data) {
//   const markup = data
//     .map(
//       ({
//         largeImageURL,
//         webformatURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) =>
//         `<div class="photo-card">
//         <a class="link" href="${largeImageURL}">
//           <img src="${webformatURL}" alt="${tags}" loading="lazy" />
//         </a>
//         <div class="info">
//             <p class="info-item">
//               <b>Likes</b><br>${likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b><br>${views}
//            </p>
//             <p class="info-item">
//               <b>Comments</b><br>${comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b><br>${downloads}
//            </p>
//          </div>
//       </div>`
//     )
//     .join('');

//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }

function handleSearch(event) {
  event.preventDefault();

  imagesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return Notify.warning(`Please enter text`);
  }
  imagesApiService.resetPage();
  loadMoreBtn.show();
  clearArticlesMarkup();

  fetchArticlesGroup();

  setTimeout(() => {
    Notify.success(`Hooray! We found ${imagesApiService.totalHits} images.`);
  }, 500);
}

// function handleLoadMore() {
//   fetchArticlesGroup();
// }

function fetchArticlesGroup() {
  loadMoreBtn.disable();
  imagesApiService
    .fetchArticles()
    .then(card => {
      const images = card.hits;

      if (!images[0]) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      appendArticlesMarkup(images);
      loadMoreBtn.enable();
      return card;
    })
    .then(data => {
      const lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();

      console.log(data, imagesApiService.page);
      const total = (imagesApiService.page - 1) * 40;
      if (data.totalHits <= total) {
        Notify.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
    })
    .catch();
}

function appendArticlesMarkup(items) {
  refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(items));
}

function clearArticlesMarkup() {
  refs.gallery.innerHTML = '';
}
// =========================================
// Прокручування сторінки!!!!!!!!!!!!!!!!!!
// Зробити плавне прокручування сторінки після запиту і відтворення кожної наступної групи зображень.
// Ось тобі код - підказка, але розберися у ньому самостійно.

// Вставляти його треба туди, де у тебе малюється інтерфейс, чи скоріше там, де приходить відповідь на проміс і рендериться розмітка.
// Можеш в тупу поставити після сповіщення ноьіфікс про те, що знайдено 500 результатів.
// В чому там прикол, плавний скрол - це переніс вью порта вниз на висоту одного елемента зі швидкістю, шо вказано в формулі(2 в цьому випадку)

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });
// Або ще можна 'https://www.npmjs.com/package/only-scrollbar'
