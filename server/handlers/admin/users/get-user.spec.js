const rewire = require('rewire');

const { Result } = require('../../../api');

const getUser = rewire('./get-user');

const mockUser = jasmine.createSpyObj('User', ['findOne']);
getUser.__set__('User', mockUser);

const req = {
  params: {
    userId: 1
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('get-user', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should get the user and return a 200 and the user', async () => {
    mockUser.findOne.and.returnValue({
      id: 1,
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joe@foo.com',
      username: 'joe',
      admin: false,
      password: 'hashed_password'
    });

    await getUser.handler(req, res);
    expect(mockUser.findOne).toHaveBeenCalledWith({
      where: {
        id: 1
      }
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      user: {
        id: 1,
        username: 'joe',
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        admin: false
      }
    });
  });

  it('should return a 404 if the user is not found', async () => {
    mockUser.findOne.and.returnValue(null);

    await getUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.NOT_FOUND,
      message: 'User not found'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockUser.findOne.and.throwError('error');

    await getUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
