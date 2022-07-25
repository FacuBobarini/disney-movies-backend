const { findAllMovies } = require('./movies.service');

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

module.exports = { getMovies };
