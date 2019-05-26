const validate = require('express-validation');

const { createComment } = require('../validations/comment');
const { getMovieComments, getMovieCharacters, checkMovieParam } = require('../validations/movie');

const movieCtrl = require('../controllers/movie');
const commentCtrl = require('../controllers/comment');

module.exports = (router) => {
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


  router
    .param('movieId', validate(checkMovieParam))
    .param('movieId', movieCtrl.loadMovie)
    /**
     * @api {get} /movies/:movieId Get Movie By Id
     * @apiDescription Get movie by Id
     * @apiVersion 1.0.0
     * @apiName GetMovieById
     * @apiGroup Movie
     * @apiPermission public
     *
     * @apiSuccess {Object} movie Movie object.
     *
     * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
     */
    .get('/movies/:movieId', movieCtrl.getMovieById)
    /**
     * @api {post} /movies/:movieId/comments Add Comment
     * @apiDescription Add a new comment
     * @apiVersion 1.0.0
     * @apiName CreateComment
     * @apiGroup Comment
     * @apiPermission public
     *
     * @apiParam  {String}             movieId     Comment's movie id
     * @apiParam  {String{6..500}}     comment  Comment's comment
     *
     * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
     */
    .post('/movies/:movieId/comments', validate(createComment), commentCtrl.createMovieComment)
    /**
     * @api {get} /movies/:movieId/comments List Movie Comments
     * @apiDescription Get a list of movie comments
     * @apiVersion 1.0.0
     * @apiName ListMoviesComments
     * @apiGroup Comment
     * @apiPermission public
     *
     * @apiSuccess {Object[]} movies List of movie comments in reverse chronological order.
     *
     * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
     */
    .get('/movies/:movieId/comments', validate(getMovieComments), commentCtrl.listAllMovieComments)
    /**
     * @api {get} /movies/:movieId/characters List Movie Characters
     * @apiDescription Get a list of movie characters
     * @apiVersion 1.0.0
     * @apiName ListMoviesCharacters
     * @apiGroup Character
     * @apiPermission public
     *
     * @apiParam  {String{1..10}}   [sortBy=name|gender|height]     Sortby properties
     * @apiParam  {String{1..10}}      [sortDirection=asc|desc]  Sort direction
     * @apiParam  {String{1..10}}      [gender=female|male|unknown]  Filter by gender
     *
     * @apiSuccess {Object} response response object.
     * @apiSuccess {Object[]} response.results List of characters.
     * @apiSuccess {Object} response.meta metadata of characters matching criteria.
     *
     * @apiError (BadRequest 400)     BadRequest   Invalid call to endpoint
     */
    .get('/movies/:movieId/characters', validate(getMovieCharacters), movieCtrl.listMovieCharacters);
};
