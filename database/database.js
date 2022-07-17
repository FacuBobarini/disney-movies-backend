const { Sequelize } = require('sequelize');

async function initializeDatabase() {
  try {
    const databaseConnection = await new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASS,
      {
        host: 'localhost',
        dialect: 'postgres',
      }
    );
    return databaseConnection;
  } catch (error) {
    console.error(error);
  }
}

module.exports = { initializeDatabase };
