const {
  validateMovies,
  validateMoviesById,
  addMovieInputValidator,
  updateMovieInputValidator,
} = require('../src/middleware/validations.movies');
const {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
} = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', validateMovies(), getMovies);
router.get('/movies/:uuid', validateMoviesById(), getMovieById);
router.post('/movies', addMovieInputValidator(), addMovie);
router.patch('/movies/:uuid', updateMovieInputValidator(), updateMovie);

module.exports = router;
