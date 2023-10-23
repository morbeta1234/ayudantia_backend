'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Game, {
        foreignKey: 'game_id',
      });
    }
  }
  Board.init({
    position_player_1: DataTypes.INTEGER,
    position_player_2: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};