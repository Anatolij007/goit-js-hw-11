export { renderImages };

const gallery = document.querySelector('.gallery');

function renderImages(images) {
  const markcup = images
    .map(image => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `
<a class="gallery-link" href="${largeImageURL}">
      <div class="gallery-item" id="${id}">
        <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy">
          <div class="info">
            <p class="info-item"><b>Likes</b>${likes}</p>
            <p class="info-item"><b>Views</b>${views}</p>
            <p class="info-item"><b>Comments</b>${comments}</p>
            <p class="info-item"><b>Downloads</b>${downloads}</p>
          </div>
      </div>
    </a> `;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markcup);
}
