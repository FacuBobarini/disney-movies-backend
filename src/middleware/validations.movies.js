const { query, param } = require('express-validator');

function validateMovies() {
  const order = ['ASC', 'DESC'];
  return [
    query('title').exists({ checkFalsy: true }).optional(),
    query('genre').exists({ checkFalsy: true }).isUUID(4).optional(),
    query('order').exists({ checkFalsy: true }).isIn(order).optional(),
  ];
}

function validateMoviesById() {
  const order = ['ASC', 'DESC'];
  return [param('uuid').exists({ checkFalsy: true }).isUUID(4)];
}

function addMovieInputValidator() {
  return [
    body('image').exists({ checkFalsy: true }).isURL().optional(),
    body('title').exists({ checkFalsy: true }).optional(),
    body('creationDate').exists({ checkFalsy: true }).isDate().optional(),
    body('rate')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .optional(),
    body('charUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
    body('genreUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
  ];
}
module.exports = { validateMovies, validateMoviesById, addMovieInputValidator };
