const { check, param } = require('express-validator/check');

const { getRoomForSlug, getRoomForName, getUniqueSlug } = require('./util');
const logger = require('../../../logger');
const { Result, sendResult } = require('../../../api');

exports.handler = async function(req, res) {
  logger.info(`Updating information for room ${req.params.room}`);

  try {
    const room = await getRoomForSlug(req.params.room);
    if (!room) {
      return sendResult(res, 404, Result.NOT_FOUND, 'Room not found');
    }

    const roomWithName = await getRoomForName(req.body.name);
    if (roomWithName && roomWithName.id !== room.id) {
      return sendResult(res, 400, Result.TAKEN, 'A room already exists with that name');
    }

    const slug = room.name === req.body.name ? room.slug : await getUniqueSlug(req.body.name);

    await updateRoom(room, {
      name: req.body.name,
      slug,
      description: req.body.description
    });

    sendResult(res, 200, Result.SUCCESS, 'Room updated');
  } catch (error) {
    logger.error(`Error updating room ${req.params.room}: ${error}`);
    return sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

async function updateRoom(room, roomData) {
  room.name = roomData.name;
  room.slug = roomData.slug;
  room.description = roomData.description;

  logger.debug(`Saving room "${room.name}" to the database`);
  await room.save();
}

exports.validation = [
  check('name', 'Name is required')
    .not()
    .isEmpty(),

  param('room', 'Room is required')
    .not()
    .isEmpty()
];
