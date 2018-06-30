const User = require('../../models').User;
const { Result, sendResult } = require('../api');

exports.handler = async function(req, res) {
  const username = req.user.sub;
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user) {
      return res.status(200).json({
        result: Result.SUCCESS,
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } else {
      sendResult(res, 404, Result.NOT_FOUND, 'User not found');
    }
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};
