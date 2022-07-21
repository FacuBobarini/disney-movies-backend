const { dbConnection } = require('../..');

function findAllMovies(queryParams) {
  const { order, genre, ...where } = queryParams;
  const dbModels = dbConnection.models;
  const findMovie = dbModels.Movie.findAll({
    where,
    attributes: ['title', 'image', 'creationDate'],
    order: order ? [['creationDate', order]] : null,
    include: genre ? { model: dbModels.Genre, where: { uuid: genre } } : null,
  });

  return findMovie;
}

module.exports = { findAllMovies };
