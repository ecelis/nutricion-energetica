'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
      this.belongsToMany(models.Recipe, {
        through: 'recipes_ingredients',
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
      });
    }
  }
  Ingredient.init({
    description_en: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion_es: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ndbn: {
        type: DataTypes.INTEGER,
        allowNull: true  // TODO how to deal with the Nutrient Data Bank Number
        // unique: true  // should be UNIQUE
    }
  }, {
    sequelize,
    modelName: 'Ingredient',
    timestamps: false
  });
  return Ingredient;
};