const { existsSync, readFileSync } = require('fs');

const express = require('express');
const expressJwt = require('express-jwt');

const logger = require('./logger');
const currentUser = require('./handlers/current-user');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const usernameCheck = require('./handlers/username-check');
const profile = require('./handlers/profile');

const jwtPublicKeyPath = process.env.JWT_PUBLIC_KEY;
if (!jwtPublicKeyPath) {
  logger.error('No JWT public key specified');
  process.exit(1);
}

let jwtPublicKey;
if (existsSync(jwtPublicKeyPath)) {
  logger.info(`Loading JWT public key from ${jwtPublicKeyPath}`);
  jwtPublicKey = readFileSync(jwtPublicKeyPath);
} else {
  logger.error(`JWT public key "${jwtPublicKeyPath}" not found`);
  process.exit(1);
}

const authenticationCheck = expressJwt({
  secret: jwtPublicKey
});

const router = express.Router();

router.post('/login', login.validation, login.handler);
router.post('/signup', signup.validation, signup.handler);
router.get('/username_check', usernameCheck.validation, usernameCheck.handler);

router.get('/current_user', authenticationCheck, currentUser.handler);
router.put('/profile', authenticationCheck, profile.validation, profile.handler);

module.exports = router;
