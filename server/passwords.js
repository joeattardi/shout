const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

exports.hashPassword = function(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
};
