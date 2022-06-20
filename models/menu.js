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
      this.belongsToMany(models.User, {
        through: 'users_menus',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Recipe, {
        through: 'menus_recipes',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  Menu.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Menu',
    timestamps: false
  });
  return Menu;
};