const { pick } = require('lodash');

const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  try {
    const users = await User.findAll();
    const userData = users.map(user => pick(user, ['id', 'username', 'firstName', 'lastName', 'email', 'admin']));

    res.status(200).json({
      result: Result.SUCCESS,
      users: userData
    });
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};
