const Joi = require('joi');

module.exports = {
  createComment: {
    body: {
      comment: Joi.string().max(500).required(),
    },
    params: {
      movieId: Joi.number().min(1).required(),
    },
  },
  getComment: {
    params: {
      commentId: Joi.number().min(1).required(),
    },
  },
  updateComment: {
    body: {
      comment: Joi.string().min(1).max(500),
    },
    params: {
      commentId: Joi.number().min(1).required(),
    },
  },
  deleteComment: {
    params: {
      commentId: Joi.number().min(1).required(),
    },
  },
  getMovieComments: {
    params: {
      movieId: Joi.number().min(1).required(),
    },
  },
};
