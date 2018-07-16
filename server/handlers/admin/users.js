const { pick } = require('lodash');

const { Op } = require('sequelize');

const User = require('../../../models').User;
const { Result, sendResult } = require('../../api');

exports.handler = async function(req, res) {
  const query = req.query.query;

  try {
    let users;

    if (query) {
      users = await User.findAll({
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
        }
      });
    } else {
      users = await User.findAll({
        order: [['lastName', 'asc'], ['firstName', 'asc']]
      });
    }
    const userData = users.map(user => pick(user, ['id', 'username', 'firstName', 'lastName', 'email', 'admin']));

    res.status(200).json({
      result: Result.SUCCESS,
      users: userData
    });
  } catch (error) {
    sendResult(res, 500, Result.ERROR, 'An unexpected error has occurred');
  }
};
