const { DataTypes } = require('sequelize');

const movieModel = {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  creationDate: {
    type: DataTypes.DATEONLY,
  },
  rate: {
    type: DataTypes.INTEGER,
    validate: { min: 1, max: 5 },
  },
};

module.exports = { movieModel };
