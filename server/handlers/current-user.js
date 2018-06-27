const User = require('../../models').User;
const logger = require('../logger');

exports.handler = async function(req, res) {
  res.status(200).json('It works!');
};
