'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MealType extends Model {
        static associate(models) {
            this.belongsToMany(models.Recipe,
            {
                through: 'recipe_mealtypes',
                onDelete: 'RESTRICT',
                onUpdate: 'CASCADE'
            });
        }
    }
    MealType.init({
        description_en: {
            type: DataTypes.STRING,
            allowNull: true
        },
        descripcion_es: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ico: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        sequelize,
        modelName: 'MealType',
        timestamps: false
    });
    return MealType;
}