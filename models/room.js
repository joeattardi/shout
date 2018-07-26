'use strict';
module.exports = (sequelize, DataTypes) => {
  var Room = sequelize.define(
    'Room',
    {
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};
