const Joi = require('joi');

module.exports = {
      checkMovieParam: {
        params: {
            movieId: Joi.number().min(1).required(),
          }
      },
      getMovieComments: {
        params: {
          movieId: Joi.number().min(1).required(),
        }
      },
      getMovieCharacters: {
          query: Joi.object().keys({
            sortDirection: Joi.string().valid('desc', 'asc'),
            sortBy: Joi.string().valid('name', 'gender', 'height'),
            gender: Joi.string().valid('female', 'male', 'unknown')
          }).strict(),
        params: {
          movieId: Joi.number().required(),
        }
      },
};
