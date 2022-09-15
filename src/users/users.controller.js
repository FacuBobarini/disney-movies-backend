const { validationResult } = require('express-validator');
const { createUser } = require('./users.service');

async function addUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const newUser = await createUser(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { addUser };
