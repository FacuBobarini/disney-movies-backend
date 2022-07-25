const { query } = require('express-validator');

function validate(method) {
  const order = ['ASC', 'DESC'];
  switch (method) {
    case 'findMovies': {
      return [
        query('title').exists({ checkFalsy: true }).optional(),
        query('genre').exists({ checkFalsy: true }).isUUID(4).optional(),
        query('order').exists({ checkFalsy: true }).isIn(order).optional(),
      ];
    }
  }
}

module.exports = { validate };
