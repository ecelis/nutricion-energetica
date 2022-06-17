'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.Menu, { through: 'menus_recipes'});
      this.belongsToMany(models.Ingredient, { through: 'recipes_ingredients'});
    }
  }
  Recipe.init({
    title: DataTypes.STRING,
    instructions: DataTypes.TEXT,
    mealType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};