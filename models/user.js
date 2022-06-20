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
      this.belongsToMany(models.User, { as: 'Coach',
        foreignKey: 'CoachId', through: 'coaches_trainees',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'});
        this.belongsToMany(models.User, { as: 'Trainee',
        foreignKey: 'TraineeId', through: 'coaches_trainees',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'});
      this.belongsToMany(models.Menu, { through: 'users_menus',
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'});
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    coach: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};