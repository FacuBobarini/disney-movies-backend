const { validationResult } = require('express-validator');
const { findAllMovies, findMovieById } = require('./movies.service');

async function getMovies(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const findMovies = await findAllMovies(req.query);
    findMovies[0]
      ? res.status(200).json(findMovies)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getMovieById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const findMovie = await findMovieById(req.params);
    findMovie
      ? res.status(200).json(findMovie)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

async function addMovie(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newMovie = await createMovie(req.body);
    res.status(200).json(newMovie);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function updateMovie(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const Movie = await findAndUpdateMovie(req.body, req.params);
    Movie.updateMovie[0]
      ? res.status(200).json(Movie)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

async function deleteMovie(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const Movie = await findAndDeleteMovie(req.params);
    Movie
      ? res.status(200).json(req.params.uuid)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
