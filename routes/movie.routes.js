const { getMovies } = require('../src/movies/movies.controller');
const router = require('express').Router();

router.get('/movies', getMovies);

module.exports = router;
