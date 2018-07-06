const { validationResult } = require('express-validator/check');

exports.Result = {
  SUCCESS: 'success',
  ERROR: 'error',
  NOT_FOUND: 'not_found',
  LOGIN_INCORRECT: 'login_incorrect',
  LOGGED_IN: 'logged_in',
  AVAILABLE: 'available',
  TAKEN: 'taken',
  NOT_AUTHORIZED: 'not_authorized'
};

exports.sendResult = function(res, status, result, message) {
  res.status(status).json({
    result,
    message
  });
};

exports.validate = function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: exports.Result.ERROR,
      errors: errors.mapped()
    });
  }

  next();
};
