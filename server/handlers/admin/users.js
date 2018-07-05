const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  sendResult(res, 200, Result.SUCCESS, 'Success!');
};
