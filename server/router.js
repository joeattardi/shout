const { readFileSync } = require('fs');

const express = require('express');
const expressJwt = require('express-jwt');

const logger = require('./logger');
const currentUser = require('./handlers/current-user');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const usernameCheck = require('./handlers/username-check');

const jwtPublicKeyPath = process.env.JWT_PUBLIC_KEY;
if (!jwtPublicKeyPath) {
  logger.error('No JWT public key specified. Authentication will not work without JWT keys.');
}
logger.info(`Loading JWT public key from ${jwtPublicKeyPath}`);
const jwtPublicKey = readFileSync(jwtPublicKeyPath);

const authenticationCheck = expressJwt({
  secret: jwtPublicKey
});

const router = express.Router();

router.post('/login', login.validation, login.handler);
router.post('/signup', signup.validation, signup.handler);
router.get('/username_check', usernameCheck.validation, usernameCheck.handler);

router.get('/current_user', authenticationCheck, currentUser.handler);

module.exports = router;
