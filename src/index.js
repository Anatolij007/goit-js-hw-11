// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { renderImages } from '/src/render';
// import { fetchImages } from '/src/fetchImages';
import './css/styles.css';
// import axios from 'axios';
import articlesTpl from './articles.hbs';
import NewsApiService from './news-service';
import LoadMoreBtn from './load-more-btn';

const refs = {
  search: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  // loadMore: document.querySelector('.load-more'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.search.addEventListener('submit', handleSearch);
// refs.loadMore.addEventListener('click', handleLoadMore);
loadMoreBtn.refs.button.addEventListener('click', fetchArticlesGroup);

function handleSearch(event) {
  event.preventDefault();

  newsApiService.searchQuery = event.currentTarget.elements.searchQuery.value;

  if (newsApiService.query === '') {
    return alert('треба щось ввести');
  }
  newsApiService.resetPage();
  loadMoreBtn.show();
  clearArticlesMarkup();

  fetchArticlesGroup();
}

// function handleLoadMore() {
//   fetchArticlesGroup();
// }

function fetchArticlesGroup() {
  loadMoreBtn.disable();
  newsApiService.fetchArticles().then(articles => {
    appendArticlesMarkup(articles);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(articles) {
  refs.gallery.insertAdjacentHTML('beforeend', articlesTpl(articles));
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
