const { validationResult } = require('express-validator');
const { findAllMovies, findMovieById } = require('./movies.service');

async function getMovies(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    findMovie = await findAllMovies(req.query);
    res.status(200).json(findMovie);
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getMovieById(req, res) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    findMovie = await findMovieById(req.params);
    res.status(200).json(findMovie);
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

module.exports = { getMovies, getMovieById, addMovie };
