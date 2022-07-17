const express = require('express');
const dotenv = require('dotenv');
const { initializeDatabase } = require('./database/database');

async function bootstrap() {
  try {
    dotenv.config();
    const dbConnection = initializeDatabase();
    const app = express();
    app.use(express.json());
    app.listen(process.env.APP_PORT);
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
