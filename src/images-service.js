import axios from 'axios';

const API_KEY = '29672911-5d08d722b508a19172ab6b083';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.totalHits = null;
  }

  async fetchArticles() {
    try {
      const options = {
        params: {
          key: `${API_KEY}`,
          q: `${this.searchQuery}`,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.page,
          par_page: 40,
        },
      };
      const responce = await axios.get(baseURL, options);

      this.totalHits = responce.data.totalHits;

      this.incrementPage();

      return responce.data;
    } catch (error) {}
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
