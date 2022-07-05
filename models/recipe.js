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
      this.belongsToMany(models.Menu, {
        through: 'menus_recipes',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Ingredient, {
        through: 'recipes_ingredients',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.MealType,
        {
          through: 'recipe_mealtypes',
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        });
    }
  }
  Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mealType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Recipe',
    timestamps: false
  });
  return Recipe;
};