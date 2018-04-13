const searchForm = document.querySelector('#search-form');
const postCode = document.querySelector('#postcode');
const cuisineType = document.querySelector('#cuisine-type');

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
}

function createRestaurantCard(data, fragment, columns) {
  const column = document.createElement('div');
  column.classList.add('column', 'is-one-quarter');
  column.innerHTML = `
    <article class="card">
      <header class="card-header">
        <p class="card-header-title">${data.name}</p>
        <p class="card-header-icon"><em>Rating: ${data.rating}/5 (${data.reviews} reviews)</em></p>
      </header>
      <div class="card-image is-centered">
        <figure class="image is-16by9">
          <img src="${data.image}" alt="Restaurant Image">
        </figure>
      </div>
      <section class="card-content">
        <div class="content">
          <address class="address">
            ${data.address.map(line => `${line}<br>`).join('')}
            Beechwood Road,
            Flat 48 Fuse Building,<br>
            E8 3DY
          </address>
          <p>${data.phone}</p>
        </content>
      </section>
      <footer class="card-footer">
        <a class="card-footer-item">Directions</a>
        <a class="card-footer-item">Reviews</a>
        <p class="card-footer-item">Price: ${data.price}</a>
      </footer>
    </article>
  `
  columns.appendChild(column);

}

searchForm.addEventListener('submit', (event) => {
  const mainBody = document.querySelector('#main-body');
  //  Fetch restaurant data from API
  const url = `api/search?postcode=${postCode.value}`;
  fetch(url)
    .then((res) => {
      if (res.status === 400) {
        throw new Error('No Entries Found');
      }
      return res.json();
    })
    .then(data => {
      const columns = document.createElement('div');
      columns.classList.add('columns', 'is-multiline');
      const cardFragment = document.createDocumentFragment();

      mainBody.innerHTML = '';

      data.forEach((restaurant) => {
        createRestaurantCard(restaurant, cardFragment, columns)
      })
      mainBody.appendChild(columns);
    })
    .catch(err => {
      mainBody.innerHTML = `
        <section class="hero is-light is-bold">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">
                Sorry
              </h1>
              <h2 class="subtitle">
                No Entries Found
              </h2>
            </div>
          </div>
        </section>
      `;
      console.log(err.message);
    })
    event.preventDefault();
})
