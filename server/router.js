const express = require('express');

const login = require('./login');
const signup = require('./signup');
const usernameCheck = require('./username-check');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.get('/username_check', usernameCheck);

module.exports = router;
