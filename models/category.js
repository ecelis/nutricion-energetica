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
        this.hasMany(models.Ingredient);
    }
  }
  Category.init({
    description_en: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion_es: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    ndbn: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps: false
  });
  return Category;
};