const { check } = require('express-validator/check');

const User = require('../../../models').User;
const logger = require('../../logger');
const passwords = require('../../passwords');
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  logger.info(`Creating new user "${req.body.firstName} ${req.body.lastName}", username "${req.body.username}"`);

  try {
    const hashedPassword = await passwords.hashPassword(req.body.password);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      admin: req.body.admin,
      password: hashedPassword
    });

    logger.debug(`Successfully created user with id ${user.id}`);
    sendResult(res, 201, Result.SUCCESS, 'User created');
  } catch (error) {
    logger.error(`Failed to create user "${req.body.username}": ${error}`);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

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

  check('admin')
    .isBoolean()
    .withMessage('Admin flag must be a boolean'),

  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required')
    .custom(value => {
      return User.findOne({ where: { username: value } }).then(user => {
        if (user) {
          throw new Error('Username is already taken');
        }
      });
    }),

  check('password', 'Password is required')
    .not()
    .isEmpty()
];
