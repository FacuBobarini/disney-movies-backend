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

async function findAndUpdateMovie(body, params) {
  let genreMovie = [];
  let characterMovie = [];
  let deleteCharacterMovie = [];
  let deleteGenreUuid = [];
  const dbModels = databaseConnection.models;
  const updateMovie = await dbModels.Movie.update(
    {
      image: body.image,
      title: body.title,
      creationDate: body.creationDate,
      rate: body.rate,
    },
    {
      where: {
        uuid: params.uuid,
      },
    }
  );
  body.charUuid
    ? (characterMovie = await Promise.all(
        body.charUuid.map(async (uuidChar) => {
          const newCharacterMovie = await dbModels.characterMovies.create({
            MovieUuid: params.uuid,
            CharacterUuid: uuidChar,
          });
          return newCharacterMovie.dataValues;
        })
      ))
    : (characterMovie = null);
  body.genreUuid
    ? (genreMovie = await Promise.all(
        body.genreUuid.map(async (uuidGenre) => {
          const newGenreMovie = await dbModels.moviesGenre.create({
            MovieUuid: params.uuid,
            GenreUuid: uuidGenre,
          });
          return newGenreMovie.dataValues;
        })
      ))
    : (genreMovie = null);
  body.deleteCharUuid
    ? (deleteCharacterMovie = await Promise.all(
        body.deleteCharUuid.map(async (uuidChar) => {
          const delCharacterMovie = await dbModels.characterMovies.destroy({
            where: {
              MovieUuid: params.uuid,
              CharacterUuid: uuidChar,
            },
          });
          return delCharacterMovie.dataValues;
        })
      ))
    : (deleteCharacterMovie = null);
  body.deleteGenreUuid
    ? (deleteGenreUuid = await Promise.all(
        body.deleteGenreUuid.map(async (uuidGenre) => {
          const delGenreMovie = await dbModels.moviesGenre.destroy({
            where: {
              MovieUuid: params.uuid,
              GenreUuid: uuidGenre,
            },
          });
          return delGenreMovie;
        })
      ))
    : (deleteGenreUuid = null);
  return {
    updateMovie,
    characterMovie,
    genreMovie,
    deleteCharacterMovie,
    deleteGenreUuid,
  };
}

async function findAndDeleteMovie(where) {
  {
    const dbModels = databaseConnection.models;
    const deleteMovie = dbModels.Movie.destroy({
      where: where,
    });
    return deleteMovie;
  }
}
module.exports = {
  findAllMovies,
  findMovieById,
  createMovie,
  findAndUpdateMovie,
  findAndDeleteMovie,
};
