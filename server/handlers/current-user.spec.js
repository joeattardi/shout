const rewire = require('rewire');

const currentUser = rewire('./current-user');
const { Result } = require('../api');

const mockUser = jasmine.createSpyObj('User', ['findOne']);
currentUser.__set__('User', mockUser);

const req = {
  user: {
    sub: 'joe'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('current-user', () => {
  it('should look up and return a 200 with the current user', async () => {
    const user = {
      id: 1,
      username: 'joe',
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joe@foo.com',
      admin: false
    };

    mockUser.findOne.and.returnValue(user);

    await currentUser.handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      user
    });
  });

  it('should return a 404 if the user is not found', async () => {
    mockUser.findOne.and.returnValue(null);
    await currentUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.NOT_FOUND,
      message: 'User not found'
    });
  });

  it('should return a 500 if there was an error', async () => {
    mockUser.findOne.and.throwError('error');
    await currentUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
