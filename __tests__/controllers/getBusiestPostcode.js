const assert = require('assert');
const getBusiestPostcode = require('../../controllers/getBusiestPostcode');

const data = [
  {
    postcode: '10224',
    recipe: 'Creamy Dill Chicken',
    delivery: 'Wednesday 1AM - 7PM',
  },
  {
    postcode: '10208',
    recipe: 'Speedy Steak Fajitas',
    delivery: 'Thursday 7AM - 5PM',
  },
  {
    postcode: '10224',
    recipe: 'Cherry Balsamic Pork Chops',
    delivery: 'Thursday 7AM - 9PM',
  },
];

module.exports = () => {
  try {
    getBusiestPostcode(data)
      .then((postcode) => {
        try {
          assert.deepStrictEqual(postcode, {
            postcode: '10224',
            delivery_count: 2,
          });
          console.log('controllers > getBusiestPostcode.js Test Passed.');
        } catch (error) {
          console.error('controllers > getBusiestPostcode.js Test Failed.');
        }
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    console.error('controllers > getBusiestPostcode.js Test Failed.');
  }
};
