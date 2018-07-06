const express = require('express');
const expressJwt = require('express-jwt');

const jwt = require('./jwt');
const { Result, sendResult, validate } = require('./api');

const deleteUser = require('./handlers/admin/delete-user');
const getUser = require('./handlers/admin/get-user');
const updateUser = require('./handlers/admin/update-user');
const usernameCheck = require('./handlers/admin/username-check');
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

router.delete('/users/:userId', authenticationCheck, adminCheck, deleteUser.validation, deleteUser.handler);
router.get('/users/:userId', authenticationCheck, adminCheck, getUser.validation, validate, getUser.handler);
router.put('/users/:userId', authenticationCheck, adminCheck, updateUser.validation, validate, updateUser.handler);
router.get('/users', authenticationCheck, adminCheck, users.handler);
router.get('/username_check', authenticationCheck, adminCheck, usernameCheck.validation, usernameCheck.handler);

module.exports = router;
