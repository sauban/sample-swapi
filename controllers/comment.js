const httpStatus = require('http-status');

const Comment = require('../models/comment');

const buildComment = req => ({
  ...req.body,
  commenter_ip: req.headers['x-forwarded-for'] || req.ip,
  movie_id: req.movie.id,
  created_at: new Date(),
  updated_at: new Date(),
});

exports.createMovieComment = async (req, res) => {
  const newComment = buildComment(req);
  const createdComment = await Comment.createComment(newComment);
  return res.status(httpStatus.CREATED).json(createdComment);
};

exports.listAllMovieComments = async (req, res) => {
  const { movieId } = req.params;
  const comments = await Comment.getMovieComments(movieId);
  return res.json(comments);
};
