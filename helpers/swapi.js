const { mapSeries } = require('bluebird');
const _ = require('lodash');

const Cache = require('./cache');
const { fetchRecord } = require('./util');

const BASE_URL = 'https://swapi.co/api';
const ttl = 60 * 60 * 2;
const movieCache = new Cache(ttl);
const characterCache = new Cache(ttl);

const _getMovieList = async (url) => {
    const movies = await fetchRecord(url);
    const record = movies.map(movie => ({
        ...{ id: movie.episode_id, name: movie.title },
        ...(_.pick(['opening_crawl', 'release_date']))
    }));
    return record;
};

const _getCharacter = async (url) => {
    const character = await fetchRecord(url);
    return character;
};

const _getMovieById = async (url) => {
    const movie = await fetchRecord(url);
    const record = { ...{ name: movie.title, id: episode_id }, ...(_.pick(movie, ['opening_crawl', 'release_date']))}
    record.characters = mapSeries(movie.characters, async (characterUrl) => {
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
    const url = `${BASE_URL}/films/${id}`
    return movieCache.get(url, async () => _getMovieById(url))
};
