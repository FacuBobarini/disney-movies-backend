const {
  getCharacters,
  getCharacterById,
  addCharacter,
  updateCharacter,
} = require('../src/characters/characters.controller');
const {
  getCharactersInputValidation,
  uuidParamsInputValidator,
  addCharacterInputValidator,
  updateCharacterInputValidator,
} = require('../src/characters/characters.inputValidations');
const router = require('express').Router();

router.get('/characters', getCharactersInputValidation(), getCharacters);
router.get('/characters/:uuid', uuidParamsInputValidator(), getCharacterById);
router.post('/characters', addCharacterInputValidator(), addCharacter);
router.patch(
  '/characters/:uuid',
  updateCharacterInputValidator(),
  updateCharacter
);

module.exports = router;
