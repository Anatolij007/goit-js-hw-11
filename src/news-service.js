const API_KEY = '2087ad7622f241ad8284941576a45d1b';
const BASE_URL = 'https://newsapi.org/v2';

const options = {
  headers: {
    'X-Api-Key': API_KEY,
  },
};

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchArticles(searchQuery) {
    const url = `${BASE_URL}/everything?q=${this.searchQuery}&pageSize=5&page=${this.page}`;

    return fetch(url, options)
      .then(responce => responce.json())
      .then(({ articles }) => {
        this.incrementPage();

        return articles;
      })
      .catch(console.log());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  // get query() {
  //   return this.searchQuery;
  // }
  // set query(newQuery) {
  //   this.searchQuery = newQuery;
  // }
}
