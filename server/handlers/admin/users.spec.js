const rewire = require('rewire');
const { Op } = require('sequelize');

const { Result } = require('../../api');

const users = rewire('./users');

const mockUser = jasmine.createSpyObj('User', ['findAll']);
users.__set__('User', mockUser);

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('users', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should return a 200 with the list of users', async () => {
    mockUser.findAll.and.returnValue([
      {
        id: 1,
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        username: 'joe',
        admin: false,
        password: 'hashed_password'
      }
    ]);

    const req = {
      query: {}
    };

    await users.handler(req, res);
    expect(mockUser.findAll).toHaveBeenCalledWith({
      order: [['lastName', 'asc'], ['firstName', 'asc']]
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      users: [
        {
          id: 1,
          firstName: 'Joe',
          lastName: 'Foo',
          email: 'joe@foo.com',
          username: 'joe',
          admin: false
        }
      ]
    });
  });

  it('should search the users if a query is specified', async () => {
    mockUser.findAll.and.returnValue([
      {
        id: 1,
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false,
        password: 'hashed_password'
      }
    ]);

    const req = {
      query: {
        query: 'joe'
      }
    };

    await users.handler(req, res);
    expect(mockUser.findAll).toHaveBeenCalledWith({
      order: [['lastName', 'asc'], ['firstName', 'asc']],
      where: {
        [Op.or]: [
          {
            firstName: {
              [Op.iLike]: '%joe%'
            }
          },
          {
            lastName: {
              [Op.iLike]: '%joe%'
            }
          },
          {
            username: {
              [Op.iLike]: '%joe%'
            }
          }
        ]
      }
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockUser.findAll.and.throwError('error');

    const req = { query: {} };

    await users.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
