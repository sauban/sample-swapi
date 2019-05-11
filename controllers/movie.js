const moment = require('moment');
const bluebird = require('bluebird');
const httpStatus = require('http-status');
const _ = require('lodash');

const Comment = require('../models/comment');
const { getMovieList, getMovieById } = require('../helpers/swapi');
const { getQueryKey, getQueryValue, getMeta } = require('../config/util');

exports.listMovies = async (req, res) => {
    const fetchedMovies = await getMovieList();
    const sortMovies = _.sortBy(fetchedMovies, movie => moment(movie.release_date));
    const movies = await bluebird.map(sortMovies, async movie => {
        movie.comment_counts = await Comment.getMovieCommentCount(movie);
        return movie;
    });
    res.send(movies);
};

exports.loadMovie = async (req, res, next) => {
    const { movieId } = req.params;
    const movie = await getMovieById(movieId);
    if (!movie) {
        throw { message: 'Movie not found', status: httpStatus.NOT_FOUND };
    }
    req.movie = movie;
    return next();
};

exports.addComment = async (req, res, next) => {
    const { movieId } = req.params;
    const commenter_ip = req.headers['x-forwarded-for'] || req.ip;
    const data = Object.assign({}, req.body, { commenter_ip, movieId });
    const comment = await Comment.query().insert(data);
    return res.json(comment);
};

exports.listComments = async (req, res) => {
    const comments = await Comment.query()
        .orderBy('created_at', 'desc');
    res.json(comments);
}

exports.listMovieComments = async (req, res) => {
    const { movieId } = req.params;
    const comments = await Comment.query()
        .where('movieId', movieId)
        .orderBy('created_at', 'desc');
    res.json(comments);
}

exports.listCharacters = async (req, res) => {
    const characters = await getCharacters();
    const { sortBy, gender } = req.query;
    const sortKey = getQueryKey(sortBy) || 'name';
    const sortValue = getQueryValue(sortBy) || 'ASC';
    let filteredCharacters;

    const sortedCharacters = _.orderBy(characters, [sortKey, sortValue]);
    
    if (gender) {
        filteredCharacters = _.filter(sortedCharacters, character => character.gender === gender);
    }

    const results = filteredCharacters || sortedCharacters;
    const meta = getMeta(results);
    return res.json({ results, meta });
};
