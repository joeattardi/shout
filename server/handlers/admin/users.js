const { pick } = require('lodash');

const { Op } = require('sequelize');

const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

const PAGE_SIZE = 25;

exports.handler = async function(req, res) {
  const query = req.query.query;
  const offset = parseInt(req.query.offset) || 0;

  try {
    let dbQuery;

    if (query) {
      dbQuery = {
        order: [['lastName', 'asc'], ['firstName', 'asc']],
        where: {
          [Op.or]: [
            {
              firstName: {
                [Op.iLike]: `%${query}%`
              }
            },
            {
              lastName: {
                [Op.iLike]: `%${query}%`
              }
            },
            {
              username: {
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
        order: [['lastName', 'asc'], ['firstName', 'asc']],
        offset,
        limit: PAGE_SIZE
      };
    }

    const totalUsers = await User.count(dbQuery);
    const users = await User.findAll(dbQuery);
    const userData = users.map(user => pick(user, ['id', 'username', 'firstName', 'lastName', 'email', 'admin']));

    res.status(200).json({
      result: Result.SUCCESS,
      users: userData,
      total: totalUsers
    });
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};
