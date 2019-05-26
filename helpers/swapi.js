const _ = require('lodash');

const cacheFn = require('./cache');
const {
  fetchRecord, convertToNum, getIdFromUrl,
} = require('./util');

const BASE_URL = 'https://swapi.co/api';
const ttl = 60 * 60 * 2;
const movieCache = cacheFn(ttl);
const characterCache = cacheFn(ttl);

const serializeMovieObject = movie => Object.assign({},
  { id: getIdFromUrl(movie.url), name: movie.title },
  _.pick(movie, ['opening_crawl', 'release_date', 'characters', 'url']));

const _getMovieList = async (url) => {
  const movies = await fetchRecord(url);
  const records = movies.map(serializeMovieObject);
  records.forEach(movie => movieCache.set(movie.url, movie));
  return records;
};

const _getCharacter = async (url) => {
  const character = await fetchRecord(url);
  const record = Object.assign(_.pick(character, ['name', 'url', 'gender']), {
    id: getIdFromUrl(character.url),
    height: convertToNum(character.height),
  });
  return record;
};

const _getMovie = async (url) => {
  const movie = await fetchRecord(url);
  const record = serializeMovieObject(movie);
  return record;
};

exports.getMovieList = async () => {
  const url = `${BASE_URL}/films`;
  return movieCache.get(url, async () => _getMovieList(url));
};

exports.getMovieById = async (id) => {
  const url = `${BASE_URL}/films/${id}/`;
  return movieCache.get(url, async () => _getMovie(url));
};

exports.getCharacterByUrl = async url => characterCache.get(url, async () => _getCharacter(url));
