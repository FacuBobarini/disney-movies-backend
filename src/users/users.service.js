const { databaseConnection } = require('../../database/database');
const dbModels = databaseConnection.models;

async function createUser(req) {
  const newUser = await dbModels.Movie.create({
    username: req.username,
    password: req.password,
    email: req.email,
  });
  return { newUser };
}

module.exports = { createUser };
