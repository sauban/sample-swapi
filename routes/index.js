const validate = require('express-validation');

const { createComment } = require('../validations/comment');
const { getMovieComments, getMovieCharacters, checkMovieParam } = require('../validations/movie');

const movieCtrl = require('../controllers/movie');
const commentCtrl = require('../controllers/comment');

module.exports = (router) => {
  /* GET home page. */
  router.get('/', (req, res) => {
    res.send({ title: 'Sample Swapi', status: 'Ok', docs: '/docs' });
  });

  router.param('movieId', validate(checkMovieParam));
  router.param('movieId', movieCtrl.loadMovie);
  /**
   * @api {get} /movies List Movies
   * @apiDescription Get a list of movies
   * @apiVersion 1.0.0
   * @apiName ListMovies
   * @apiGroup Movie
   * @apiPermission public
   *
   * @apiSuccess {Object[]} movies List of movies.
   *
   * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
   */
  router.get('/movies', movieCtrl.listMovies);

  /**
   * @api {post} /movies/:movieId/comments Add Comment
   * @apiDescription Add a new comment
   * @apiVersion 1.0.0
   * @apiName CreateComment
   * @apiGroup Comment
   * @apiPermission public
   *
   * @apiParam  {String}             movie_id     Comment's movie_id
   * @apiParam  {String{6..500}}     comment  Comment's comment
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   */
  router.post('/movies/:movieId/comments', validate(createComment), commentCtrl.createMovieComment);

  /**
   * @api {get} /movies/:movieId/comments List Movie Comments
   * @apiDescription Get a list of movie comments
   * @apiVersion 1.0.0
   * @apiName ListMoviesComments
   * @apiGroup Comment
   * @apiPermission public
   *
   * @apiSuccess {Object[]} movies List of movie comments.
   *
   * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
   */
  router.get('/movies/:movieId/comments', validate(getMovieComments), commentCtrl.listAllMovieComments);

  /**
   * @api {get} /movies/:movieId/characters List Movie Characters
   * @apiDescription Get a list of movie characters
   * @apiVersion 1.0.0
   * @apiName ListMoviesCharacters
   * @apiGroup Comment
   * @apiPermission public
   *
   * @apiParam  {String{asc|desc}}   [sortBy=name|gender|height]     Sortby properties
   * @apiParam  {String{1..10}}      [sortDirection=asc|desc]  Sort direction
   * @apiParam  {String{1..10}}      [gender=female|male|unknown]  Filter by gender
   *
   * @apiSuccess {Object} response response object.
   * @apiSuccess {Object[]} response.results List of characters.
   * @apiSuccess {Object} response.meta metadata of characters matching criteria.
   *
   * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
   */
  router.get('/movies/:movieId/characters', validate(getMovieCharacters), movieCtrl.listMovieCharacters);
};
