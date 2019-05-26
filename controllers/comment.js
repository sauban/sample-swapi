const movieService = require('../services/movie');

const buildComment = req => ({
  ...req.body,
  commenter_ip: req.headers['x-forwarded-for'] || req.ip,
  movie_id: req.movie.id,
  created_at: new Date(),
  updated_at: new Date(),
});

exports.createMovieComment = async (req, res) => {
  const newComment = buildComment(req);
  const createdComment = await movieService.createMovieComment(newComment);
  return res.status(201).json(createdComment);
};

exports.listAllMovieComments = async (req, res) => {
  const { movie } = req;
  const { comments } = await movieService.getByMovieWithComments(movie);
  return res.json(comments);
};
