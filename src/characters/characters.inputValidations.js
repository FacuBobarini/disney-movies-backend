const { query } = require('express-validator');

function getCharactersInputValidation() {
  return (
    query('name').exists({ checkFalsy: true }).optional(),
    query('age').exists({ checkFalsy: true }).optional(),
    query('movie').exists({ checkFalsy: true }).optional().isUUID(4)
  );
}

function uuidParamsInputValidator() {
  return [param('uuid').exists({ checkFalsy: true }).isUUID(4)];
}

function addCharacterInputValidator() {
  return [
    body('image').exists({ checkFalsy: true }).isURL().optional(),
    body('name').exists({ checkFalsy: true }).optional(),
    body('age').exists({ checkFalsy: true }).isNumeric().optional(),
    body('weight').exists({ checkFalsy: true }).isNumeric().optional(),
    body('history').exists({ checkFalsy: true }).isDate().optional(),
    body('movieUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
  ];
}

function updateCharacterInputValidator() {
  return [
    body('image').exists({ checkFalsy: true }).isURL().optional(),
    body('name').exists({ checkFalsy: true }).optional(),
    body('age').exists({ checkFalsy: true }).isNumeric().optional(),
    body('weight').exists({ checkFalsy: true }).isNumeric().optional(),
    body('history').exists({ checkFalsy: true }).isDate().optional(),
    body('movieUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
    body('deletemovieUuid.*').exists({ checkFalsy: true }).isUUID(4).optional(),
  ];
}

module.exports = {
  getCharactersInputValidation,
  uuidParamsInputValidator,
  addCharacterInputValidator,
  updateCharacterInputValidator,
};
