const rewire = require('rewire');

const { Result } = require('../../../api');

const createUser = rewire('./create-user');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const mockUser = jasmine.createSpyObj('User', ['create']);
createUser.__set__('User', mockUser);

const mockPasswords = jasmine.createSpyObj('passwords', ['hashPassword']);
createUser.__set__('passwords', mockPasswords);

const req = {
  body: {
    firstName: 'Joe',
    lastName: 'Foo',
    email: 'joe@foo.com',
    username: 'joe',
    admin: false,
    password: 'foo'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('create-user', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should create the user and return a 201', async () => {
    mockUser.create.and.returnValue({
      id: 1,
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joe@foo.com',
      username: 'joe',
      admin: false,
      password: 'foo'
    });

    mockPasswords.hashPassword.and.returnValue('hashed_password');

    await createUser.handler(req, res);
    expect(mockUser.create).toHaveBeenCalledWith({
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joe@foo.com',
      username: 'joe',
      admin: false,
      password: 'hashed_password'
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      message: 'User created'
    });
  });

  it('should return a 500 if there was an error', async () => {
    mockUser.create.and.throwError('error');

    await createUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
