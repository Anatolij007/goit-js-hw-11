// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import renderList from '/src/render';
import './css/styles.css';
// import articlesTpl from './articles.hbs';
import ImagesApiService from './images-service';
import LoadMoreBtn from './load-more-btn';

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

function renderList(items) {
  const markup = items
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
  <a href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes</b>${likes}
      </p>
      <p class="info-item">
        <b>Views</b>${views}
      </p>
      <p class="info-item">
        <b>Comments</b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>${downloads}
      </p>
    </div>
  </a>
</div>`;
      }
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function handleSearch(event) {
  event.preventDefault();

  imagesApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query === '') {
    return alert('треба щось ввести');
  }
  imagesApiService.resetPage();
  loadMoreBtn.show();
  clearArticlesMarkup();

  fetchArticlesGroup();
}

// function handleLoadMore() {
//   fetchArticlesGroup();
// }

function fetchArticlesGroup() {
  loadMoreBtn.disable();
  imagesApiService.fetchArticles().then(articles => {
    renderList(articles);
    loadMoreBtn.enable();
  });
}

// function appendArticlesMarkup(items) {
//   refs.gallery.insertAdjacentHTML('beforeend', renderList(items));
// }

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
