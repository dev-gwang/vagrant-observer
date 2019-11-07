'use strict';
module.exports = (sequelize, DataTypes) => {
  const Agents = sequelize.define('Agents', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  Agents.associate = function(models) {
    // associations can be defined here
  };
  return Agents;
};