const { map } = require('bluebird');
const _ = require('lodash');

const Cache = require('./cache');
const {
  fetchRecord, toFeet, convertToNum, transformGender, getIdFromUrl,
} = require('./util');


const BASE_URL = 'https://swapi.co/api';
const ttl = 60 * 60 * 2;
const movieCache = new Cache(ttl);
const characterCache = new Cache(ttl);

const _getMovieList = async (url) => {
  const movies = await fetchRecord(url);
  const records = movies.map(movie => Object.assign({},
    { id: getIdFromUrl(movie.url), name: movie.title },
    _.pick(movie, ['opening_crawl', 'release_date', 'url'])));
  return records;
};

const _getCharacter = async (url) => {
  const character = await fetchRecord(url);
  const record = Object.assign(_.pick(character, ['name', 'url']), {
    id: getIdFromUrl(character.url),
    heightInFeet: toFeet(convertToNum(character.height)),
    height: convertToNum(character.height),
    gender: transformGender(character.gender),
  });
  return record;
};

const _getMovieById = async (url) => {
  const id = url.split('/').pop();
  const movie = await fetchRecord(url);
  const record = Object.assign({},
    { id, name: movie.title },
    _.pick(movie, ['opening_crawl', 'release_date']));
  record.characters = await map(movie.characters, async (characterUrl) => {
    const character = await characterCache.get(characterUrl, () => _getCharacter(characterUrl));
    return character;
  });
  return record;
};


exports.getMovieList = async () => {
  const url = `${BASE_URL}/films`;
  return movieCache.get(url, async () => _getMovieList(url));
};

exports.getMovieById = async (id) => {
  const url = `${BASE_URL}/films/${id}`;
  return movieCache.get(url, async () => _getMovieById(url));
};
