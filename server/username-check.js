const User = require('../models').User;
const logger = require('./logger');

module.exports = async function(req, res) {
  const username = req.query.username;

  logger.debug(`Looking for user with username "${username}"`);
  try {
    const user = await User.findOne({
      where: {
        username
      }
    });
    logger.debug(user !== null ? `Found user "${username}"` : `Did not find user "${username}"`);

    if (user === null) {
      return res.status(200).json({
        result: 'available'
      });
    }

    res.status(200).json({
      result: 'taken'
    });
  } catch (error) {
    logger.error(`Error looking up user by username "${username}": ${error}`);
    res.status(500).json({
      result: 'error'
    });
  }
};
