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
        params: {
          movieId: Joi.number().required(),
        }
      },
};
