'use strict';
const loader = require('./sequelizeLoader');
const Sequelize = loader.Sequelize;

const Camplog = loader.database.define(
  'camplogs',
  {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    date: {
      type: Sequelize.DataTypes.DATEONLY,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: Sequelize.STRING,
      allowNull: false
    },
  },
  {
    freezeTableName: false,
    timestamps: true
  }
);

module.exports = Camplog;
