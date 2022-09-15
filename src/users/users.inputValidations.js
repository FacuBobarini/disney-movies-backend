const { body } = require('express-validator');

function addUserInputValidator() {
  return [
    body('username').exists({ checkFalsy: true }),
    body('password').exists({ checkFalsy: true }),
    body('email').exists({ checkFalsy: true }).isEmail(),
  ];
}

module.exports = { addUserInputValidator };
