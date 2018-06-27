const { readFileSync } = require('fs');

const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');

const User = require('../models').User;
const logger = require('./logger');
const passwords = require('./passwords');

const jwtKeyPath = process.env.JWT_PRIVATE_KEY;
if (!jwtKeyPath) {
  logger.error('No JWT key specified. Authentication will not work without a JWT key.');
}
logger.info(`Loading JWT key from ${jwtKeyPath}`);
const jwtKey = readFileSync(jwtKeyPath);

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
      const jwtBearerToken = jwt.sign({}, jwtKey, {
        algorithm: 'RS256',
        expiresIn: 120,
        subject: user.username
      });

      logger.debug(`Sending token: ${jwtBearerToken}`);

      return res.status(200).json({
        result: 'logged_in',
        token: jwtBearerToken,
        expiresIn: 120,
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
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
