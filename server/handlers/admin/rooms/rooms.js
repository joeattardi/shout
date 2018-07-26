const { pick } = require('lodash');

const { Op } = require('sequelize');

const Room = require('../../../../models').Room;
const { Result, sendResult } = require('../../../api');

const PAGE_SIZE = 25;

exports.handler = async function(req, res) {
  const query = req.query.query;
  const offset = parseInt(req.query.offset) || 0;

  try {
    let dbQuery;

    if (query) {
      dbQuery = {
        order: [['name', 'asc']],
        where: {
          [Op.or]: [
            {
              name: {
                [Op.iLike]: `%${query}%`
              }
            },
            {
              slug: {
                [Op.iLike]: `%${query}%`
              }
            }
          ]
        },
        offset,
        limit: PAGE_SIZE
      };
    } else {
      dbQuery = {
        order: [['name', 'asc']],
        offset,
        limit: PAGE_SIZE
      };
    }

    const totalRooms = await Room.count(dbQuery);
    const rooms = await Room.findAll(dbQuery);
    const roomData = rooms.map(room => pick(room, ['name', 'slug', 'description']));

    res.status(200).json({
      result: Result.SUCCESS,
      rooms: roomData,
      total: totalRooms
    });
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};
