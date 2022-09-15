const express = require('express');
const dotenv = require('dotenv');
const { databaseConnection } = require('./database/database');
const movieRouter = require('./routes/movie.routes');
const characterRouter = require('./routes/character.routes');

async function bootstrap() {
  try {
    dotenv.config();
    const dbConnection = databaseConnection;
    const app = express();
    app.use(express.json());
    app.use('/api', movieRouter);
    app.use('/api', characterRouter);
    app.listen(process.env.APP_PORT);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
