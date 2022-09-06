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
  deleteMovie,
} = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', validateMovies(), getMovies);
router.get('/movies/:uuid', validateMoviesById(), getMovieById);
router.post('/movies', addMovieInputValidator(), addMovie);
router.patch('/movies/:uuid', updateMovieInputValidator(), updateMovie);
router.delete('/movies/:uuid', uuidParamsInputValidator(), deleteMovie);

module.exports = router;
