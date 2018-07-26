const rewire = require('rewire');

const { Result } = require('../../../api');

const updateUser = rewire('./update-user');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const mockPasswords = jasmine.createSpyObj('passwords', ['hashPassword']);
updateUser.__set__('passwords', mockPasswords);

const mockUser = jasmine.createSpyObj('User', ['findOne']);
updateUser.__set__('User', mockUser);

const req = {
  params: {
    userId: '1'
  },
  body: {
    firstName: 'Joe',
    lastName: 'Foo',
    email: 'joe@foo.com',
    username: 'joe',
    admin: false,
    password: 'foo'
  },
  user: {
    sub: 'admin'
  }
};

describe('update-user', () => {
  let res;

  beforeEach(() => {
    res = jasmine.createSpyObj('res', ['status', 'json']);
    res.status.and.returnValue(res);
  });

  it('should update the user and return a 200', async () => {
    const user = jasmine.createSpyObj('user', ['save']);
    mockUser.findOne.and.returnValue(user);

    mockPasswords.hashPassword.and.returnValue('hashed_password');

    await updateUser.handler(req, res);
    expect(mockUser.findOne).toHaveBeenCalledWith({
      where: {
        id: 1
      }
    });
    expect(user.save).toHaveBeenCalled();
    expect(user.firstName).toBe('Joe');
    expect(user.lastName).toBe('Foo');
    expect(user.email).toBe('joe@foo.com');
    expect(user.username).toBe('joe');
    expect(user.admin).toBe(false);
    expect(user.password).toBe('hashed_password');

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      message: 'User updated'
    });
  });

  it('should return a 500 if there is an error while loading the user', async () => {
    mockUser.findOne.and.throwError('error');

    await updateUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });

  it('should return a 500 if there is an error while saving the user', async () => {
    const user = jasmine.createSpyObj('user', ['save']);
    user.save.and.throwError('error');
    mockUser.findOne.and.returnValue(user);

    await updateUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });

  it('should return a 404 if the user is not found', async () => {
    mockUser.findOne.and.returnValue(null);

    await updateUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
  });
});
