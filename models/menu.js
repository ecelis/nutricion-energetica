'use strict';
const db = require('../models');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const { User } = sequelize.models;

  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, { through: 'users_menus'});
      this.belongsToMany(models.Recipe, { through: 'menus_recipes'});
    }
  }
  Menu.init({
    title: DataTypes.STRING,
    date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};