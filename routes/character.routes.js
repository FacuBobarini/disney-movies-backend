const {
  getCharacters,
  getCharacterById,
  addCharacter,
} = require('../src/characters/characters.controller');
const {
  getCharactersInputValidation,
  uuidParamsInputValidator,
  addCharacterInputValidator,
} = require('../src/characters/characters.inputValidations');
const router = require('express').Router();

router.get('/characters', getCharactersInputValidation(), getCharacters);
router.get('/characters/:uuid', uuidParamsInputValidator(), getCharacterById);
router.post('/characters', addCharacterInputValidator(), addCharacter);

module.exports = router;
