const { addUser, loginUser } = require('../src/users/users.controller');
const {
  addUserInputValidator,
  loginUserInputValidator,
} = require('../src/users/users.inputValidations');

const router = require('express').Router();

router.post('/auth/register', addUserInputValidator(), addUser);

router.post('/auth/login', loginUserInputValidator(), loginUser);

module.exports = router;
