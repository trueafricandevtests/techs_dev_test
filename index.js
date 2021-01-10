const http = require('http');
const url = require('url');
const json = require('./utils/toJSON');
const getJsonFromRequest = require('./controllers/getJsonFromRequest');
const getUniqueRecipeNames = require('./controllers/getUniqueRecipeNames');
const getCountPerRecipe = require('./controllers/getCountPerRecipe');
const getBusiestPostcode = require('./controllers/getBusiestPostcode');
const listRecipeNamesByWord = require('./controllers/listRecipeNamesByWord');

const server = http.createServer((req, res) => {
  // handle http requests here
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-disposition', 'attachment; filename= result.json');

  // extract recipe name search query params
  const url_parts = url.parse(req.url);
  const query = url_parts.query;
  const search_words = [];

  if (query) {
    query.split('&').forEach((value) => {
      search_words.push(value.split('=')[1]);
    });
  }

  switch (req.method) {
    case 'POST': {
      // handle GET requests
      switch (url_parts.pathname) {
        case '/': {
          res.statusCode = 200;
          return res.end(
            json({
              api_health_check: 'Small Stats API up and running',
            })
          );
        }

        case '/unique_recipe_count': {
          try {
            getJsonFromRequest(req)
              .then((recipesData) => {
                //console.log(recipesData);

                if (!recipesData) {
                  res.statusCode = 400;
                  throw new Error('missing recipes data');
                }
                getUniqueRecipeNames(recipesData)
                  .then((unique) => {
                    res.statusCode = 200;

                    res.end(json({ unique_recipe_count: unique.length }));
                  })
                  .catch(() => {
                    res.statusCode = 500;
                    throw new Error('Counting unique recipes Failed');
                  });
              })
              .catch((error) => {
                res.statusCode = 400;
                throw error;
              });

            return;
          } catch (error) {
            return res.end(json({ error: error.message }));
          }
        }

        case '/count_per_recipe': {
          try {
            getJsonFromRequest(req)
              .then((recipesData) => {
                getCountPerRecipe(recipesData)
                  .then((count) => {
                    res.statusCode = 200;
                    return res.end(json({ count_per_recipe: count }));
                  })
                  .catch((error) => {
                    res.statusCode = 500;
                    throw error;
                  });
              })
              .catch((error) => {
                res.statusCode = 400;
                throw error;
              });

            return;
          } catch (error) {
            return res.end(json({ error: error.message }));
          }
        }

        case '/busiest_postcode': {
          try {
            getJsonFromRequest(req)
              .then((recipesData) => {
                getBusiestPostcode(recipesData)
                  .then((postcode) => {
                    res.statusCode = 200;
                    return res.end(json({ busiest_postcode: postcode }));
                  })
                  .catch((error) => {
                    res.statusCode = 500;
                    throw error;
                  });
              })
              .catch((error) => {
                res.statusCode = 400;
                throw error;
              });

            return;
          } catch (error) {
            return res.end(json({ error: error.message }));
          }
        }

        case '/match_by_name': {
          try {
            getJsonFromRequest(req)
              .then((recipesData) => {
                if (!search_words.length) {
                  throw new Error('query params are missing');
                }

                listRecipeNamesByWord(recipesData, search_words)
                  .then((names) => {
                    res.statusCode = 200;
                    return res.end(json({ match_by_name: names }));
                  })
                  .catch((error) => {
                    res.statusCode = 500;
                    throw error;
                  });
              })
              .catch((error) => {
                console.log(req.url);
                res.statusCode = 400;
                throw error;
              });

            return;
          } catch (error) {
            return res.end(json({ error: error.message }));
          }
        }

        default: {
          res.statusCode = 400;
          res.end(json({ error: 'Bad Request' }));
        }
      }

      return;
    }

    case 'GET': {
      res.statusCode = 200;
      res.end(json({ message: 'You have hit the true_dev small Stat API' }));
      return;
    }

    default: {
      res.statusCode = 400;
      res.end(json({ error: 'Bad Request' }));
    }
  }
});

const PORT = 3001;
const HOST = '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});

// act on any unhandled errors/exceptions
process.on('uncaughtException', (error) => {
  console.error(error.message);
});
