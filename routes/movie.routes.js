const {
  validateMovies,
  validateMoviesById,
} = require('../src/middleware/validations.movies');
const { getMovies, getMoviesById } = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', validateMovies(), getMovies);
router.get('/movies/:uuid', validateMoviesById(), getMoviesById);

module.exports = router;
