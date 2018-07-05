const express = require('express');
const expressJwt = require('express-jwt');

const jwt = require('./jwt');
const { Result, sendResult } = require('./api');

const users = require('./handlers/admin/users');

const authenticationCheck = expressJwt({
  secret: jwt.jwtPublicKey
});

function adminCheck(req, res, next) {
  if (!req.user.admin) {
    sendResult(res, 403, Result.NOT_AUTHORIZED, 'Admin access is required');
  } else {
    next();
  }
}

const router = express.Router();

router.get('/users', authenticationCheck, adminCheck, users.handler);

module.exports = router;