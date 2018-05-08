const searchForm = document.querySelector('#search-form');
const postCode = document.querySelector('#postcode');
const cuisineType = document.querySelector('#cuisine-type');

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
}

function createRestaurantCard(data, index, columns) {
  const column = document.createElement('div');
  column.classList.add('column', 'is-one-quarter');
  column.innerHTML = `
    <article class="card">
      <header class="card-header">
        <p class="card-header-title">${data.name}</p>
        <p class="card-header-icon"><em>Rating: ${data.rating}/5 (${data.reviews} reviews)</em></p>
      </header>
      <div class="card-image is-centered">
        <figure class="image is-3by2">
          <img src="${data.image}" alt="Restaurant Image">
        </figure>
      </div>
      <section class="card-content">
        <div class="content">
          <address class="address">
            ${data.address.map(line => `${line}<br>`).join('')}
          </address>
          <p>${data.phone}</p>
          <p>Price: ${data.price}</p>
        </content>
      </section>
      <footer class="card-footer">
        <a class="card-footer-item">Directions</a>
        <a class="card-footer-item">Reviews</a>
      </footer>
      <footer class="card-footer">
        <button class="card-footer-item button is-large is-primary" id="save-btn" data-index="${index}">Save To Favourites</button>
      </footer>
    </article>
  `;
  columns.appendChild(column);
}

searchForm.addEventListener('submit', event => {
  const mainBody = document.querySelector('#main-body');
  //  Fetch restaurant data from API
  const url = `api/search?postcode=${postCode.value}&cuisine=${cuisineType.value}`;
  fetch(url)
    .then(res => {
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

      data.forEach((restaurant, index) => {
        createRestaurantCard(restaurant, index, columns);
      });
      mainBody.appendChild(columns);
      return data;
    })
    .then(restaurant => {
      const saveBtn = document.querySelectorAll('#save-btn');
      saveBtn.forEach((button, index) => {
        button.addEventListener('click', event => {
          const itemIndex = event.target.dataset.index;
          const data = restaurant[itemIndex];

          fetch('profile', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
              'content-type': 'application/json'
            },
            credentials: 'include'
          })
            .then(response => {
              if (response.status === 422) {
                throw new Error('Validation Error');
              } else if (response.status === 401) {
                window.location.href = '/auth/login';
              } else {
                button.disabled = true;
                button.innerHTML = 'Saved';
                return response.json();
              }
            })
            .catch(err => console.log(err.message));
        });
      });
    })
    .catch(err => {
      mainBody.innerHTML = `
        <section class="hero is-light is-bold">
          <div class="hero-body">
            <div class="container has-text-centered">
              <h1 class="title">
                Sorry...
              </h1>
              <h2 class="subtitle">
                No Entries Found
              </h2>
            </div>
          </div>
        </section>
      `;
      console.log(err.message);
    });
  event.preventDefault();
});
