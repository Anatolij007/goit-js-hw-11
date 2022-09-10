import axios from 'axios';

// axios.defaults.baseURL = 'https://pixabay.com/api/';

// const KEY = '29672911-5d08d722b508a19172ab6b083';

fetch(
  '${baseURL}?key=${KEY}&q=cat&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40'
)
  .then(r => r.json())
  .catch(console.log());
