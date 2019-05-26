const _ = require('lodash');

const { getMeta, validateQUery } = require('../helpers/util');
const movieService = require('../services/movie');

exports.listMovies = async (req, res) => {
  const movies = await movieService.getMoviesWithCommentsCount();
  res.json(movies);
};

exports.loadMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await movieService.getMovie(movieId);
  if (!movie) {
    return next({ message: 'Movie not found', status: 404 });
  }
  req.movie = movie;
  return next();
};

exports.getMovieById = async (req, res) => {
  const { movie } = req;
  const record = await movieService.getByMovieWithComments(movie);
  res.json(record);
};

exports.listMovieCharacters = async (req, res) => {
  const error = validateQUery(['sortBy', 'sortDirection', 'gender'], req.query);
  if (error) {
    throw error;
  }
  const { movie } = req;
  const { characters } = movie;
  const { sortBy, sortDirection, gender } = req.query;

  const sortKey = sortBy || 'name';
  const sortValue = sortDirection || 'asc';
  let filteredCharacters;

  const sortedCharacters = _.orderBy(characters, [sortKey], [sortValue]);

  if (gender) {
    filteredCharacters = _.filter(sortedCharacters, character => character.gender === gender);
  }

  const results = filteredCharacters || sortedCharacters;
  const meta = getMeta(results);
  return res.json({ results, meta });
};
