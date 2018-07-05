const { param, validationResult } = require('express-validator/check');

const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      result: Result.ERROR,
      errors: errors.mapped()
    });
  }

  const userIdToDelete = parseInt(req.params.userId);
  const currentUserId = req.user.id;

  if (userIdToDelete === currentUserId) {
    return sendResult(res, 400, Result.ERROR, 'Cannot delete the currently logged in user');
  }

  try {
    await User.destroy({
      where: {
        id: userIdToDelete
      }
    });

    sendResult(res, 200, Result.SUCCESS, 'User was deleted');
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

exports.validation = [param('userId', 'User ID must be a number').isInt()];
