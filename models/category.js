'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        this.hasMany(models.Ingredient, {
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        });
    }
  }
  Category.init({
    description_en: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion_es: {
        type: DataTypes.STRING,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false
  });
  return Category;
};