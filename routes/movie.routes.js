const { validate } = require('../src/middleware/validations');
const { getMovies } = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', validate('findMovies'), getMovies);

module.exports = router;
