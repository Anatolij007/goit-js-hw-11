// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// import { renderImages } from '/src/render';
// import { fetchImages } from '/src/fetchImages';
// import './css/styles.css';
// import axios from 'axios';

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMore: document.querySelector('.load-more'),
};
console.log(refs.searchForm);

refs.searchForm.addEventListener('sumbit', handleSearchForm);
refs.loadMore.addEventListener('click', handleLoadMore);

function handleSearchForm(event) {
  event.preventDefault();

  const options = {
    headers: {
      'X-Api-Key': '2087ad7622f241ad8284941576a45d1b',
    },
  };

  const url = 'https://newsapi.org/v2/everything?q=tesla&pageSize=5&page=1';
  fetch(url, options)
    .then(r => r.json())
    .catch(console.log());
}

function handleLoadMore() {}

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
