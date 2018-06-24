const User = require('../models').User;
const logger = require('./logger');
const passwords = require('./passwords');

module.exports = async function(req, res) {
  logger.info(`Received signup request for new user "${req.body.firstName} ${req.body.lastName}", username "${req.body.username}"`);

  const hashedPassword = await passwords.hashPassword(req.body.password);

  try {
    logger.debug('Creating new user');
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword
    });

    logger.debug(`Successfully created user with id ${user.id}`);
    res.status(201).json({
      result: 'success'
    });
  } catch (error) {
    logger.error(`Failed to create user "${req.body.username}": ${error}`);
    res.status(500).json({
      result: 'error'
    });
  }
};
