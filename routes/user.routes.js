const { addUser } = require('../src/users/users.controller');
const {
  addUserInputValidator,
} = require('../src/users/users.inputValidations');

const router = require('express').Router();

router.post('/auth/register', addUserInputValidator(), addUser);
