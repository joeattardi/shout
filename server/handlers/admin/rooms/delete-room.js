const { Op } = require('sequelize');
const { param } = require('express-validator/check');

const logger = require('../../../logger');
const Room = require('../../../../models').Room;
const { Result, sendResult } = require('../../../api');
const { getRoomForSlug } = require('./util');

exports.handler = async function(req, res) {
  try {
    const room = await getRoomForSlug(req.params.room);

    if (room) {
      await Room.destroy({
        where: {
          slug: {
            [Op.iLike]: req.params.room
          }
        }
      });

      sendResult(res, 200, Result.SUCCESS, 'Room was deleted');
    } else {
      return sendResult(res, 404, Result.NOT_FOUND, 'Room not found');
    }
  } catch (error) {
    logger.error(`Error deleting room "${req.params.room}": ${error}`);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

exports.validation = [
  param('room', 'Room is required')
    .not()
    .isEmpty()
];
