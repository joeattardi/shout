const { check, validationResult } = require('express-validator/check');

const User = require('../models').User;
const logger = require('./logger');
const passwords = require('./passwords');

exports.handler = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  const username = req.body.username;
  logger.info(`Received login request for user "${username}"`);

  try {
    logger.debug(`Looking for user "${username}"`);
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    logger.debug(user !== null ? `Found user "${username}"` : `Did not find user "${username}"`);

    if (user === null) {
      return res.status(403).json({
        result: 'login_incorrect'
      });
    }

    const hashedPassword = user.password;
    const passwordResult = await passwords.validatePassword(req.body.password, hashedPassword);

    if (passwordResult) {
      return res.status(200).json({
        result: 'logged_in'
      });
    }

    return res.status(403).json({
      result: 'login_incorrect'
    });
  } catch (error) {
    logger.error(`Error while logging in user "${username}": ${error}`);
    res.status(500).json({
      result: 'error'
    });
  }
};

exports.validation = [
  check('username', 'Username is required')
    .not()
    .isEmpty(),

  check('password', 'Password is required')
    .not()
    .isEmpty()
];
