const { databaseConnection } = require('../../database/database');
const CryptoJS = require('crypto-js');
const dbModels = databaseConnection.models;

async function createUser(req) {
  const newUser = await dbModels.User.create({
    username: req.username,
    password: Crypto.AES.encrypt(
      req.body.password,
      process.env.SEC_PASS
    ).toString(),
    email: req.email,
  });
  return { newUser };
}

async function accesUser(req) {
  let hashedPassword;
  let OriginalPassword;
  let login;
  const user = await dbModels.User.findOne({
    where: { username: req.body.username },
  });
  user
    ? (hashedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SEC_PASS
      ))
    : (hashedPassword = null);

  hashedPassword
    ? (OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8))
    : (OriginalPassword = null);
  OriginalPassword === req.body.password ? (login = true) : (login = false);
  return { user, login };
}

module.exports = { createUser, accesUser };
