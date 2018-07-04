'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Admin',
          lastName: 'User',
          username: 'admin',
          email: 'admin@admin.com',
          admin: true,
          password: '$2b$10$Yl0UUUHIMkOjT/5dAmNot.27kMcjkA/0xcRq1aOba9Zpz/QoSc4Oy',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', [{ username: 'admin' }]);
  }
};
