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
module.exports = { validateMovies, validateMoviesById };
