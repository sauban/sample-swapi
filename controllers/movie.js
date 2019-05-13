const moment = require('moment');
const bluebird = require('bluebird');
const httpStatus = require('http-status');
const _ = require('lodash');

const Comment = require('../models/comment');
const { getMovieList, getMovieById } = require('../helpers/swapi');
const { getMeta, validateQUery } = require('../helpers/util');

exports.listMovies = async (req, res, next) => {
  const fetchedMovies = await getMovieList();
  const sortMovies = _.sortBy(fetchedMovies, movie => moment(movie.release_date));
  const movies = await bluebird.map(sortMovies, async (movie) => {
    const counts = await Comment.getMovieCommentCount(movie.id);
    // eslint-disable-next-line no-param-reassign
    movie.comment_counts = _.head(_.at(counts, '[0].count'));
    return movie;
  }).catch(next);
  res.json(movies);
};

exports.loadMovie = async (req, res, next) => {
  try {
    const { movieId } = req.params;
    const movie = await getMovieById(movieId);
    if (!movie) {
      return next({ message: 'Movie not found', status: httpStatus.NOT_FOUND });
    }
    req.movie = movie;
    return next();
  } catch (error) {
    if (error.response && error.message) {
      error.message = 'Movie not found';
    }
    return next(error);
  }
};

exports.getMovieById = async (req, res) => {
  const { movie } = req;
  movie.comments = await Comment.getAllComment(movie.id);
  res.json(movie);
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
