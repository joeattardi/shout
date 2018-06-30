const { check, validationResult } = require('express-validator/check');

const { Result, sendResult } = require('../api');
const User = require('../../models').User;
const logger = require('../logger');
const passwords = require('../passwords');

exports.handler = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: Result.ERROR,
      errors: errors.mapped()
    });
  }

  const username = req.user.sub;
  logger.info(`Received profile update request for user "${username}"`);

  if (req.body.newPassword && !req.body.currentPassword) {
    return sendResult(res, 400, Result.ERROR, 'Current password is required when changing password');
  }

  const user = await loadUser(username);
  if (!user) {
    return sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }

  if (req.body.currentPassword) {
    const passwordResult = await passwords.validatePassword(req.body.currentPassword, user.password);
    if (!passwordResult) {
      return sendResult(res, 403, Result.LOGIN_INCORRECT, 'Current password is incorrect');
    }
  }

  if (await updateUser(user, req.body.firstName, req.body.lastName, req.body.email, req.body.newPassword)) {
    sendResult(res, 200, Result.SUCCESS, 'Profile updated');
  } else {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

async function loadUser(username) {
  try {
    return await User.findOne({
      where: {
        username
      }
    });
  } catch (error) {
    logger.error(`Error while loading user "${username}": ${error}`);
  }
}

async function updateUser(user, firstName, lastName, email, password) {
  if (password) {
    user.password = await passwords.hashPassword(password);
  }

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = email;

  try {
    await user.save();
    return true;
  } catch (error) {
    logger.error(`Error while updating user profile for "${user.username}": ${error}`);
    return false;
  }
}

exports.validation = [
  check('firstName', 'First name is required')
    .not()
    .isEmpty(),

  check('lastName', 'Last name is required')
    .not()
    .isEmpty(),

  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address')
];
