const movieService = require('../services/movie');
const characterService = require('../services/character');

exports.listMovies = async (req, res) => {
  const movies = await movieService.getMoviesWithCommentsCount();
  res.json(movies);
};

exports.loadMovie = async (req, res, next) => {
  const { movieId } = req.params;
  const movie = await movieService.getMovie(movieId);
  if (!movie) {
    return next({ message: 'Movie not found', status: 404 });
  }
  req.movie = movie;
  return next();
};

exports.getMovieById = async (req, res) => {
  const { movie } = req;
  const record = await movieService.getByMovieWithComments(movie);
  return res.json(record);
};

exports.listMovieCharacters = async (req, res) => {
  const { movie } = req;
  const { sortBy, sortDirection, gender } = req.query;
  const characters = await characterService.getMovieCharacters({
    characterUrls: movie.characters,
    sortBy,
    sortDirection,
    gender,
  });
  return res.json(characters);
};
