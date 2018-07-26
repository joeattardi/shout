const { Op } = require('sequelize');

const Room = require('../../../../models').Room;

exports.getRoomForSlug = function getRoomForSlug(roomSlug) {
  return Room.findOne({
    where: {
      slug: {
        [Op.iLike]: roomSlug
      }
    }
  });
}