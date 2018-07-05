const express = require('express');
const expressJwt = require('express-jwt');

const jwt = require('./jwt');

const users = require('./handlers/admin/users');

const authenticationCheck = expressJwt({
  secret: jwt.jwtPublicKey
});

const router = express.Router();

router.get('/users', authenticationCheck, users.handler);

module.exports = router;
