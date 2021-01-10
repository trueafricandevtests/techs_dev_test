module.exports = (recipes) => {
  return new Promise((resolve, reject) => {
    try {
      const recipeNames = [];
      recipes.forEach((recipeObj) => {
        // extract recipe names
        recipeNames.push(recipeObj.recipe);
      });

      const uniqueRecipeNames = recipeNames.filter((name, index, self) => {
        return self.indexOf(name) === index;
      });

      return resolve(uniqueRecipeNames);
    } catch (error) {
      return reject(error);
    }
  });
};
