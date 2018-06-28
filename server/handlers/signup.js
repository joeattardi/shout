const { check, validationResult } = require('express-validator/check');

const User = require('../../models').User;
const jwt = require('../jwt');
const logger = require('../logger');
const passwords = require('../passwords');

exports.handler = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  logger.info(`Received signup request for new user "${req.body.firstName} ${req.body.lastName}", username "${req.body.username}"`);

  try {
    logger.debug('Creating new user');
    const hashedPassword = await passwords.hashPassword(req.body.password);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword
    });

    logger.debug(`Successfully created user with id ${user.id}`);
    const token = jwt.sign(user.username, jwt.jwtExpireTime);
    res.status(201).json({
      result: 'success',
      token,
      expiresIn: jwt.jwtExpireTime,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    logger.error(`Failed to create user "${req.body.username}": ${error}`);
    res.status(500).json({
      result: 'error'
    });
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
