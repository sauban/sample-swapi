const registerMovieRoutes = require('./movie');

module.exports = (router) => {
  /* GET home page. */
  router.get('/', (req, res) => {
    res.send({ title: 'Sample Swapi', status: 'Ok', docs: '/docs' });
  });
  registerMovieRoutes(router);
};
