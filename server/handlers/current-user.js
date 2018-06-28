const User = require('../../models').User;
const logger = require('../logger');

exports.handler = async function(req, res) {
  console.log(req.user);

  const username = req.user.sub;
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });

    if (user) {
      return res.status(200).json({
        result: 'success',
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      });
    } else {
      return res.status(404).json({
        result: 'not_found',
        message: 'User not found'
      });
    }
  } catch (error) {
    return res.status(500).json({
      result: 'error',
      error
    });
  }
};
