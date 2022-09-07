const { databaseConnection } = require('../../database/database');

function findAllCharacters(queryparams) {
  const { movie, ...where } = queryparams;
  const dBModel = databaseConnection.models;

  const findCharacters = dBModel.Character.findAll({
    where,
    attributes: ['image', 'name'],
    include: movie ? { model: dBModel.Movie, where: { uuid: movie } } : null,
  });
  return findCharacters;
}

module.exports = { findAllCharacters };
