const { query, param, body } = require('express-validator');

function getMoviesInputValidator() {
  const order = ['ASC', 'DESC'];
  return [
    query('title').exists({ checkFalsy: true }).optional(),
    query('genre').exists({ checkFalsy: true }).isUUID(4).optional(),
    query('order').exists({ checkFalsy: true }).isIn(order).optional(),
  ];
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
function updateMovieInputValidator() {
  return [
    param('uuid').exists({ checkFalsy: true }).isUUID(4),
    body('image').exists({ checkFalsy: true }).isURL().optional(),
    body('title').exists({ checkFalsy: true }).optional(),
    body('creationDate').exists({ checkFalsy: true }).isDate().optional(),
    body('rate')
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .optional(),
    body('deleteCharUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
    body('deleteGenreUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
    body('charUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
    body('genreUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
  ];
}

function uuidParamsInputValidator() {
  return [param('uuid').exists({ checkFalsy: true }).isUUID(4)];
}
module.exports = {
  getMoviesInputValidator,
  addMovieInputValidator,
  updateMovieInputValidator,
  uuidParamsInputValidator,
};
