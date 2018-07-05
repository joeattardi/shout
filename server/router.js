const express = require('express');
const expressJwt = require('express-jwt');

const jwt = require('./jwt');

const currentUser = require('./handlers/current-user');
const login = require('./handlers/login');
const signup = require('./handlers/signup');
const usernameCheck = require('./handlers/username-check');
const profile = require('./handlers/profile');

const authenticationCheck = expressJwt({
  secret: jwt.jwtPublicKey
});

const router = express.Router();

router.post('/login', login.validation, login.handler);
router.post('/signup', signup.validation, signup.handler);
router.get('/username_check', usernameCheck.validation, usernameCheck.handler);

router.get('/current_user', authenticationCheck, currentUser.handler);
router.put('/profile', authenticationCheck, profile.validation, profile.handler);

module.exports = router;
