const { check } = require('express-validator/check');
const { Op } = require('sequelize');
const { pick } = require('lodash');

const Room = require('../../../../models').Room;
const logger = require('../../../logger');

const { Result, sendResult } = require('../../../api');
const { getUniqueSlug } = require('./util');

exports.handler = async function(req, res) {
  logger.info(`Creating new room "${req.body.name}"`);

  try {
    const existingRoom = await Room.findOne({
      where: {
        name: {
          [Op.iLike]: req.body.name
        }
      }
    });

    if (existingRoom) {
      return sendResult(res, 400, Result.TAKEN, 'A room already exists with that name');
    }

    const room = await Room.create({
      name: req.body.name,
      slug: await getUniqueSlug(req.body.name),
      description: req.body.description || ''
    });

    logger.debug(`Successfully created room with slug ${room.slug}`);
    res.status(201).json({
      result: Result.SUCCESS,
      room: pick(room, ['id', 'name', 'slug', 'description'])
    });
  } catch (error) {
    logger.error(`Error creating room "${req.body.name}": ${error}`);
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};

exports.validation = [
  check('name', 'Name is required')
    .not()
    .isEmpty()
];
