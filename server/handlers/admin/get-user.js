const { param } = require('express-validator/check');
const { pick } = require('lodash');

const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  const userId = parseInt(req.params.userId);

  try {
    const user = await User.findOne({
      where: {
        id: userId
      }
    });

    if (user) {
      return res.status(200).json({
        result: Result.SUCCESS,
        user: pick(user, ['id', 'username', 'firstName', 'lastName', 'email', 'admin'])
      });
    } else {
      sendResult(res, 404, Result.NOT_FOUND, 'User not found');
    }
  } catch (error) {
    console.log(error);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

exports.validation = [param('userId', 'User ID must be a number').isInt()];
