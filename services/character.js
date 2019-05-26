/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
const bluebird = require('bluebird');
const _ = require('lodash');

const { getCharacterByUrl } = require('../helpers/swapi');

const transformGender = (character) => {
  if (!_.includes(['female', 'male', 'unknown'], character.gender)) {
    character.gender = 'unknown';
  }
  return character;
};

const toFeet = (num) => {
  if (isNaN(num)) {
    return null;
  }
  const realFeet = +num / 30.48;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return `${feet}ft and ${inches} inches`;
};

const heightToFeet = (character) => {
  character.heightInFeet = toFeet(character.height);
  return character;
};

const getMeta = results => ({
  total: results.length,
  totalHeight: results.reduce((acc, curr) => {
    acc.cm += curr.height;
    acc.inch = toFeet(acc.cm);
    return acc;
  }, { cm: 0 }),
});


const _getMovieCharacters = async (characters) => {
  const records = await bluebird.all(characters.map(getCharacterByUrl));
  const transformedRecords = records.map(transformGender).map(heightToFeet);
  return transformedRecords;
};

exports.getMovieCharacters = async ({
  sortBy = 'name', sortDirection = 'asc', gender, characterUrls = [],
}) => {
  const characters = await _getMovieCharacters(characterUrls);
  let filteredCharacters;

  const sortedCharacters = _.orderBy(characters, [sortBy], [sortDirection]);

  if (gender) {
    filteredCharacters = _.filter(sortedCharacters, character => character.gender === gender);
  }

  const results = filteredCharacters || sortedCharacters;
  const meta = getMeta(results);

  return { results, meta };
};
