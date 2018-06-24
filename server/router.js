const express = require('express');

const signup = require('./signup');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
