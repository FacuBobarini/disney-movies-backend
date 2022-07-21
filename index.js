const express = require('express');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./database/database');

dotenv.config();
const dbConnection = initializeDatabase();

async function bootstrap() {
  try {
    const app = express();
    app.use(express.json());
    app.listen(process.env.APP_PORT);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();

module.exports = { dbConnection };
