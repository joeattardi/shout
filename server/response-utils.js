exports.sendResult = function(res, status, result, message) {
  res.status(status).json({
    result,
    message
  });
};
