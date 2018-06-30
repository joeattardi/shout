const { check, validationResult } = require('express-validator/check');

const User = require('../../models').User;
const jwt = require('../jwt');
const logger = require('../logger');
const passwords = require('../passwords');
const { Result, sendResult } = require('../api');

exports.handler = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: Result.ERROR,
      errors: errors.mapped()
    });
  }

  const username = req.body.username;
  logger.info(`Received login request for user "${username}"`);

  try {
    logger.debug(`Looking for user "${username}"`);
    const user = await User.findOne({
      where: {
        username
      }
    });
    logger.debug(user !== null ? `Found user "${username}"` : `Did not find user "${username}"`);

    if (user === null) {
      return sendResult(res, 403, Result.LOGIN_INCORRECT, 'Login incorrect');
    }

    const hashedPassword = user.password;
    const passwordResult = await passwords.validatePassword(req.body.password, hashedPassword);

    if (passwordResult) {
      const token = jwt.sign(user.username, jwt.jwtExpireTime);

      return res.status(200).json({
        result: Result.LOGGED_IN,
        token,
        expiresIn: jwt.jwtExpireTime,
        user: {
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName
        }
      });
    }

    return sendResult(res, 403, Result.LOGIN_INCORRECT, 'Login incorrect');
  } catch (error) {
    logger.error(`Error while logging in user "${username}": ${error}`);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
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
