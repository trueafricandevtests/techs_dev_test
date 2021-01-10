const getUniqueRecipeNames = require('./getUniqueRecipeNames');

module.exports = (recipes) => {
  return new Promise((resolve, reject) => {
    try {
      let countPerRecipe = [];
      getUniqueRecipeNames(recipes)
        .then((uniqueRecipeNames) => {
          uniqueRecipeNames
            .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
            .forEach((name) => {
              const count = recipes.filter(
                (recipeObj) => recipeObj.recipe === name
              ).length;
              countPerRecipe.push({
                recipe: name,
                count: count,
              });
            });
          resolve(countPerRecipe);
        })
        .catch((error) => reject(error));
    } catch (error) {
      return reject(error);
    }
  });
};
