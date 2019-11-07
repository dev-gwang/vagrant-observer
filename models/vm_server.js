'use strict';
module.exports = (sequelize, DataTypes) => {
  const vm_server = sequelize.define('vm_server', {
    ip: DataTypes.STRING,
    name: DataTypes.STRING,
    server_type: DataTypes.INTEGER,
    cpu: DataTypes.INTEGER,
    mem: DataTypes.INTEGER,
    counts: DataTypes.INTEGER,
    connect: DataTypes.INTEGER,
    doing: DataTypes.INTEGER
  }, {});
  vm_server.associate = function(models) {
    // associations can be defined here
  };
  return vm_server;
};