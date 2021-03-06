'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
