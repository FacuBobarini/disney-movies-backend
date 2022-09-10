const { DataTypes } = require('sequelize');

const characterModel = {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.STRING,
  },
  weight: {
    type: DataTypes.STRING,
  },
  history: {
    type: DataTypes.STRING,
  },
};

module.exports = { characterModel };
