const express = require('express');

const login = require('./handlers/login');
const signup = require('./handlers/signup');
const usernameCheck = require('./handlers/username-check');

const router = express.Router();

router.post('/login', login.validation, login.handler);
router.post('/signup', signup.validation, signup.handler);
router.get('/username_check', usernameCheck.validation, usernameCheck.handler);

module.exports = router;
