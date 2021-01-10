
module.exports = (recipesData) => {
  return new Promise((resolve, reject) => {
    try {
      const postcodeCounts = {};
      let busiestPostcodeCount = 1;
      let busiestPostcode;

      recipesData.forEach((recipeObj) => {
        const postcode = recipeObj.postcode;
        let postcodeCount = postcodeCounts[postcode];
        if (postcodeCount) {
          postcodeCount += 1;
          postcodeCounts[postcode] = postcodeCount;
          if (postcodeCount > busiestPostcodeCount) {
            busiestPostcodeCount = postcodeCount;
            busiestPostcode = postcode;
          }
        } else {
          postcodeCounts[postcode] = 1;
        }
      });

      if (busiestPostcode) {
        return resolve({
          postcode: busiestPostcode,
          delivery_count: busiestPostcodeCount,
        });
      } // else just return the 1st postcode in the array => all postcodes have 1 delivery.

      return resolve({ postcode: recipesData[0].postcode, delivery_count: 1 });
    } catch (error) {
      return reject(error);
    }
  });
};
