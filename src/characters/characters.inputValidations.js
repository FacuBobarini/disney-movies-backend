const { query } = require('express-validator');

function getCharactersInputValidation() {
  return (
    query('name').exists({ checkFalsy: true }).optional(),
    query('age').exists({ checkFalsy: true }).optional(),
    query('movie').exists({ checkFalsy: true }).optional().isUUID(4)
  );
}

module.exports = { getCharactersInputValidation };