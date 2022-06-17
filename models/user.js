'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Menu, { through: 'users_menus'})
      //this.hasMany(models.Menu)
    }
  }
  User.init({
    email: DataTypes.STRING,
    displayName: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    coach: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};