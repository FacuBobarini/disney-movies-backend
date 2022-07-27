const { Sequelize } = require('sequelize');
const { characterModel } = require('./models/character');
const { genreModel } = require('./models/genre');
const { movieModel } = require('./models/movie');
const dotenv = require('dotenv');
dotenv.config();

const databaseConnection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: 'localhost',
    dialect: 'postgres',
  }
);

const movie = databaseConnection.define('Movie', movieModel);
const character = databaseConnection.define('Character', characterModel);
const genre = databaseConnection.define('Genre', genreModel);

movie.belongsToMany(character, { through: 'characterMovies' });
character.belongsToMany(movie, { through: 'characterMovies' });

movie.belongsToMany(genre, { through: 'moviesGenre' });
genre.belongsToMany(movie, { through: 'moviesGenre' });

(async () => {
  await databaseConnection.sync({ force: false });
})();

module.exports = { databaseConnection };
