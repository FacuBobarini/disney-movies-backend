const { validationResult } = require('express-validator');
const {
  findAllCharacters,
  findCharacterById,
  createCharacter,
} = require('./characters.service');

async function getCharacters(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    const findCharacters = await findAllCharacters(req.query);
    findCharacters[0]
      ? res.status(200).json(findCharacters)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

async function getCharacterById(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const findCharacter = await findCharacterById(req.params);
    findCharacter
      ? res.status(200).json(findCharacter)
      : res.status(404).json('Not Found');
  } catch (error) {
    res.status(500).json(error);
  }
}

async function addCharacter(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newCharacter = await createCharacter(req.body);
    res.status(200).json(newCharacter);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { getCharacters, getCharacterById, addCharacter };
