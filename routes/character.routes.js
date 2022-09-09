const {
  getCharacters,
  getCharacterById,
} = require('../src/characters/characters.controller');
const {
  getCharactersInputValidation,
} = require('../src/characters/characters.inputValidations');
const {
  uuidParamsInputValidator,
} = require('../src/movies/validations.movies');
const router = require('express').Router();

router.get('/characters', getCharactersInputValidation(), getCharacters);
router.get('/characters/:uuid', uuidParamsInputValidator(), getCharacterById);

module.exports = router;
