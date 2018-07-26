const { Op } = require('sequelize');
const { param } = require('express-validator/check');
const { pick } = require('lodash');

const Room = require('../../../../models').Room;
const { Result, sendResult } = require('../../../api');
const logger = require('../../../logger');

exports.handler = async function(req, res) {
  const roomSlug = req.params.room;

  try {
    const room = await Room.findOne({
      where: {
        slug: {
          [Op.iLike]: roomSlug
        }
      }
    });

    if (room) {
      return res.status(200).json({
        result: Result.SUCCESS,
        room: pick(room, ['id', 'name', 'slug', 'description'])
      });
    } else {
      sendResult(res, 404, Result.NOT_FOUND, 'Room not found');
    }
  } catch (error) {
    logger.error(`Error while getting room "${roomSlug}": ${error}`);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

exports.validation = [
  param('room', 'Room is required')
    .not()
    .isEmpty()
];
