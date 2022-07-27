const { databaseConnection } = require('../../database/database');

function findAllMovies(queryParams) {
  const { order, genre, ...where } = queryParams;
  const dbModels = databaseConnection.models;
  const findMovie = dbModels.Movie.findAll({
    where,
    attributes: ['title', 'image', 'creationDate'],
    order: order ? [['creationDate', order]] : null,
    include: genre ? { model: dbModels.Genre, where: { uuid: genre } } : null,
  });

  return findMovie;
}
function findMovieById(where) {
  const dbModels = databaseConnection.models;
  const findMovie = dbModels.Movie.findOne({
    where,
    include: { model: dbModels.Character },
  });

  return findMovie;
}

module.exports = { findAllMovies, findMovieById };
