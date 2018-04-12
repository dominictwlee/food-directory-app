const searchForm = document.querySelector('#search-form');
const postCode = document.querySelector('#postcode');
const cuisineType = document.querySelector('#cuisine-type');

function handleErrors(res) {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res.json();
}

function createRestaurantCard(data, fragment) {
  //  Build div element with column class
  const column = document.createElement('div');
  column.classList.add('column', 'is-one-quarter');

  // Build Article element with card class and append to column
  const card = document.createElement('article');
  card.classList.add('card');
  column.appendChild(card);

  //  Build Card header and append to card
  const cardHeader = document.createElement('header');
  cardHeader.classList.add('card-header');
  card.appendChild(cardHeader);

  //  Build card header title
  const cardHeaderTitle = document.createElement('p');
  cardHeaderTitle.classList.add('card-header-title');
  cardHeaderTitle.innerText = data.name;
  cardHeader.appendChild(cardHeaderTitle);
  //  Build header rating
  const rating = document.createElement('p');
  rating.classList.add('card-header-icon');
  rating.innerText = data.rating;
  cardHeader.appendChild(rating);

  //  Build Card image
  const cardImage = document.createElement('div');
  const imageWrapper = document.createElement('figure');
  const image = document.createElement('img');
  cardImage.classList.add('card-image');
  imageWrapper.classList.add('image', 'is-16by9');
  image.setAttribute('src', data.image);
  image.setAttribute('alt', 'restaurant image');
  card.appendChild(cardImage);
  cardImage.appendChild(imageWrapper)
  imageWrapper.appendChild(image);

  //  Build Card Content Section
  const cardContent = document.createElement('section');
  cardContent.classList.add('card-content');
  card.appendChild(cardContent);

  //  Build Content block
  const content = document.createElement('div');
  // content.classList.add('content');
  cardContent.appendChild(content);

  //  Create address block
  data.address.forEach((sentence) => {
    const line = document.createElement('p');
    line.innerText = sentence;
    content.appendChild(line);
  });


  //  Create Price Info
  const price = document.createElement('p');
  price.innerText = `Price: ${data.price}`;
  content.appendChild(price);

  fragment.appendChild(column);
}

searchForm.addEventListener('submit', (event) => {
  //  Fetch restaurant data from API
  const url = `api/search?postcode=${postCode.value}`;
  // console.log(postCode.value)

  fetch(url)
  .then((res) => res.json())
  .then(data => {
    const cardFragment = document.createDocumentFragment();
    const columns = document.querySelector('.columns');
    columns.innerHTML = '';
    data.forEach((restaurant) => {
      createRestaurantCard(restaurant, cardFragment)
    })
    columns.appendChild(cardFragment);
  })
  event.preventDefault();
})
