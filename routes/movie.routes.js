const {
  validateMovies,
  validateMoviesById,
  addMovieInputValidator,
} = require('../src/middleware/validations.movies');
const {
  getMovies,
  getMovieById,
  addMovie,
} = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', validateMovies(), getMovies);
router.get('/movies/:uuid', validateMoviesById(), getMovieById);
router.post('/movies', addMovieInputValidator(), addMovie);

module.exports = router;
