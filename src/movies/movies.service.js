const { databaseConnection } = require('../../database/database');
const dbModels = databaseConnection.models;

function findAllMovies(queryParams) {
  const { order, genre, ...where } = queryParams;

  const findMovie = dbModels.Movie.findAll({
    where,
    attributes: ['title', 'image', 'creationDate'],
    order: order ? [['creationDate', order]] : null,
    include: genre ? { model: dbModels.Genre, where: { uuid: genre } } : null,
  });

  return findMovie;
}

function findMovieById(where) {
  const findMovie = dbModels.Movie.findOne({
    where,
    include: { model: dbModels.Character },
  });

  return findMovie;
}

async function createMovie(req) {
  let genreMovie = [];
  let characterMovie = [];
  const newMovie = await dbModels.Movie.create({
    image: req.image,
    title: req.title,
    creationDate: req.creationDate,
    rate: req.rate,
  });
  req.charUuid
    ? (characterMovie = await Promise.all(
        req.charUuid.map(async (uuidChar) => {
          const newCharacterMovie = await dbModels.characterMovies.create({
            MovieUuid: newMovie.uuid,
            CharacterUuid: uuidChar,
          });
          return newCharacterMovie.dataValues;
        })
      ))
    : (characterMovie = null);
  req.genreUuid
    ? (genreMovie = await Promise.all(
        req.genreUuid.map(async (uuidGenre) => {
          const newGenreMovie = await dbModels.moviesGenre.create({
            MovieUuid: newMovie.uuid,
            GenreUuid: uuidGenre,
          });
          return newGenreMovie.dataValues;
        })
      ))
    : (genreMovie = null);
  return { newMovie, characterMovie, genreMovie };
}

module.exports = { findAllMovies, findMovieById, createMovie };
