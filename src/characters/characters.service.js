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

function findCharacterById(where) {
  const findMovie = dbModels.Character.findOne({
    where,
    include: { model: dbModels.Movie },
  });

  return findMovie;
}

async function createCharacter(req) {
  let movieCharacter = [];
  const newCharacter = await dbModels.Movie.create({
    image: req.image,
    name: req.name,
    age: req.age,
    weight: req.weight,
    history: req.history,
  });
  req.movieUuid
    ? (characterMovie = await Promise.all(
        req.movieUuid.map(async (uuidMovie) => {
          const newCharacterMovie = await dbModels.characterMovies.create({
            CharacterUuid: newCharacter.uuid,
            MovieUuid: uuidMovie,
          });
          return newCharacterMovie.dataValues;
        })
      ))
    : (characterMovie = null);
  return { newCharacter, movieCharacter };
}
module.exports = { findAllCharacters, findCharacterById, createCharacter };
