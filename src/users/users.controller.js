const { validationResult } = require('express-validator');
const { createUser, accesUser } = require('./users.service');

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

async function loginUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await accesUser(req.body);
    user.login
      ? res.status(200).json(user.user)
      : res.status(401).json('Wrong Credentials!');
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = { addUser, loginUser };
