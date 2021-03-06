/* eslint-disable no-param-reassign */
const moment = require('moment');
const bluebird = require('bluebird');
const _ = require('lodash');

const Comment = require('../models/comment');
const { getMovieList, getMovieById } = require('../helpers/swapi');

const getMovieCommentsCount = async (movie) => {
  const counts = await Comment.getMovieCommentCount(movie.id);
  movie.comment_counts = _.head(_.at(counts, '[0].count'));
  return movie;
};

const omitCharacterAndUrls = movie => _.omit(movie, ['characters', 'url']);

exports.getMoviesWithCommentsCount = async () => {
  const fetchedMovies = await getMovieList();
  const sortMovies = _.sortBy(fetchedMovies, movie => moment(movie.release_date));
  const moviesWithCommentsCount = await bluebird.all(sortMovies.map(getMovieCommentsCount));
  const records = moviesWithCommentsCount.map(omitCharacterAndUrls);
  return records;
};

exports.getMovie = async (movieId) => {
  try {
    const movie = await getMovieById(movieId);
    return movie;
  } catch (error) {
    return null;
  }
};

exports.getByMovieWithComments = async (movieObj) => {
  const comments = await Comment.getMovieComments(movieObj.id);
  const record = Object.assign({}, omitCharacterAndUrls(movieObj), { comments });
  return record;
};

exports.createMovieComment = async (commentObj) => {
  const newComment = await Comment.createComment(commentObj);
  return newComment;
};
