const { check, param } = require('express-validator/check');

const User = require('../../../models').User;
const logger = require('../../logger');
const passwords = require('../../passwords');
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  logger.info(`Updating information for user "${req.body.username}"`);
  logger.info(`Request initiated by user "${req.user.sub}"`);

  const userId = parseInt(req.params.userId);

  try {
    const user = await loadUser(userId);
    if (!user) {
      return sendResult(res, 404, Result.ERROR, 'User not found');
    }

    if (await updateUser(user, req.body)) {
      sendResult(res, 200, Result.SUCCESS, 'User updated');
    } else {
      sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
    }
  } catch (error) {
    return sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

async function loadUser(id) {
  try {
    return await User.findOne({
      where: {
        id
      }
    });
  } catch (error) {
    logger.error(`Error while loading user id ${id}: ${error}`);
    throw error;
  }
}

async function updateUser(user, userData) {
  if (userData.password) {
    user.password = await passwords.hashPassword(userData.password);
  }

  user.firstName = userData.firstName;
  user.lastName = userData.lastName;
  user.email = userData.email;
  user.username = userData.username;
  user.admin = userData.admin;

  try {
    await user.save();
    return true;
  } catch (error) {
    logger.error(`Error while updating user "${user.username}": ${error}`);
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
    .withMessage('Must be a valid email address'),

  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .custom((value, { req, location, path }) => {
      return User.findOne({ where: { username: value } }).then(user => {
        if (user && user.id !== parseInt(req.params.userId)) {
          throw new Error('Username is already taken');
        }
      });
    }),

  check('admin')
    .isBoolean()
    .withMessage('Admin flag must be a boolean'),

  param('userId', 'User ID must be a number').isInt()
];
