const { getCharacters } = require('../src/characters/characters.controller');
const {
  getCharactersInputValidation,
} = require('../src/characters/characters.inputValidations');
const router = require('express').Router();

router.get('/characters', getCharactersInputValidation(), getCharacters);

module.exports = router;
