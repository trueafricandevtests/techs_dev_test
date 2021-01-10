const getUniqueRecipeNames = require('./getUniqueRecipeNames');

module.exports = (recipes, words) => {
  return new Promise((resolve, reject) => {
    try {
      getUniqueRecipeNames(recipes)
        .then((recipeNames) => {
          const matchedRecipeNames = recipeNames.filter((recipeName) => {
            return words.some((word) => recipeName.split(' ').includes(word));
          });

          return resolve(matchedRecipeNames);
        })
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  });
};
