const { databaseConnection } = require('../../database/database');
const CryptoJS = require('crypto-js');
const dbModels = databaseConnection.models;

async function createUser(req) {
  const newUser = await dbModels.Movie.create({
    username: req.username,
    password: Crypto.AES.encrypt(
      req.body.password,
      process.env.SEC_PAS
    ).toString(),
    email: req.email,
  });
  return { newUser };
}

module.exports = { createUser };
