const { Op } = require('sequelize');
const slug = require('slug');

const logger = require('../../../logger');
const Room = require('../../../../models').Room;

exports.getRoomForSlug = function getRoomForSlug(roomSlug) {
  return Room.findOne({
    where: {
      slug: {
        [Op.iLike]: roomSlug
      }
    }
  });
};

exports.getRoomForName = function getRoomForName(roomName) {
  return Room.findOne({
    where: {
      name: {
        [Op.iLike]: roomName
      }
    }
  });
};

exports.getUniqueSlug = async function getUniqueSlug(name) {
  let uniqueSlug = slug(name);
  logger.debug(`Got slug: ${uniqueSlug}`);
  let room = await exports.getRoomForSlug(uniqueSlug);

  let suffix = 1;
  while (room) {
    uniqueSlug = `${slug(name)}-${suffix++}`;
    logger.debug(`Slug already in use, trying ${uniqueSlug}`);
    room = await exports.getRoomForSlug(uniqueSlug);
  }

  logger.debug(`Found unique slug: ${uniqueSlug}`);
  return uniqueSlug.toLowerCase();
};
