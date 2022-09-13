const { databaseConnection } = require('../../database/database');
const dbModels = databaseConnection.models;

function findAllCharacters(queryparams) {
  const { movie, ...where } = queryparams;
  const findCharacters = dbModels.Character.findAll({
    where,
    attributes: ['image', 'name'],
    include: movie ? { model: dbModels.Movie, where: { uuid: movie } } : null,
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
  let characterMovie = [];
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
  return { newCharacter, characterMovie };
}

async function findAndUpdateCharacter(body, params) {
  let characterMovie = [];
  let deleteCharacterMovie = [];
  const updateCharacter = await dbModels.Character.update(
    {
      image: body.image,
      name: body.name,
      age: body.age,
      weight: body.weight,
      history: body.history,
    },
    {
      where: {
        uuid: params.uuid,
      },
    }
  );
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

  body.deleteMovieUuid
    ? (deleteCharacterMovie = await Promise.all(
        body.deleteMovieUuid.map(async (uuidMovie) => {
          const delCharacterMovie = await dbModels.characterMovies.destroy({
            where: {
              CharacterUuid: params.uuid,
              MovieUuid: uuidMovie,
            },
          });
          return delCharacterMovie.dataValues;
        })
      ))
    : (deleteCharacterMovie = null);

  return {
    updateCharacter,
    characterMovie,
    deleteCharacterMovie,
  };
}
module.exports = {
  findAllCharacters,
  findCharacterById,
  createCharacter,
  findAndUpdateCharacter,
};
