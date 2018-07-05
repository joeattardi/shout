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
