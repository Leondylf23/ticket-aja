'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ticket, {
        foreignKey: "createdBy",
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    fullname: DataTypes.STRING,
    profileImage: DataTypes.TEXT,
    dob: DataTypes.DATE,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};