const express = require('express');
const request = require('request-promise-native');

const apiRouter = express.Router();

apiRouter.get('/search', (req, res) => {
  const { postcode, cuisine } = req.query;
  //  get geocode from google maps API
  const geoCode = {
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${postcode}&key=${process.env.GOOGLE_API_KEY}`,
    json: true,
  };

  request(geoCode)
    .then((res) => {
      if (res.status === 'ZERO_RESULTS') {
        throw new Error('Invalid Address');
      } else {
        const {lat, lng} = res.results[0].geometry.location;
        const yelpSearch = {
          url: `https://api.yelp.com/v3/businesses/search?categories=${cuisine.toLowerCase()}&latitude=${lat}&longitude=${lng}&limit=12&sort_by=rating&radius=5000`,
          json: true,
          headers : {
            Authorization: `Bearer ${process.env.YELP_API_KEY}`,
          }
        };
        //  Make GET request to Yelp with attained geoCode
        return request(yelpSearch);
      }
    })
    .then((docs) => {
      const restaurants = docs.businesses.map((restaurant) => {
        return {
          name: restaurant.name,
          image: restaurant.image_url,
          phone: restaurant.display_phone,
          reviews: restaurant.review_count,
          price: restaurant.price,
          rating: restaurant.rating,
          address: restaurant.location.display_address,
        };
      })
      res.json(restaurants);

    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send();
    })
});

module.exports = apiRouter;
