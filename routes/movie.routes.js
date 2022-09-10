const {
  addMovieInputValidator,
  updateMovieInputValidator,
  uuidParamsInputValidator,
  getMoviesInputValidator,
} = require('../src/movies/movies.inputValidations');
const {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', getMoviesInputValidator(), getMovies);
router.get('/movies/:uuid', uuidParamsInputValidator(), getMovieById);
router.post('/movies', addMovieInputValidator(), addMovie);
router.patch('/movies/:uuid', updateMovieInputValidator(), updateMovie);
router.delete('/movies/:uuid', uuidParamsInputValidator(), deleteMovie);

module.exports = router;
