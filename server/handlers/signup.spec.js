const rewire = require('rewire');

const { Result } = require('../api');

const logger = require('../logger');
logger.transports.forEach(t => (t.silent = true));

const signup = rewire('./signup');

const mockUser = jasmine.createSpyObj('User', ['create']);
signup.__set__('User', mockUser);

const mockPasswords = jasmine.createSpyObj('passwords', ['hashPassword']);
signup.__set__('passwords', mockPasswords);

const mockJwt = jasmine.createSpyObj('jwt', ['sign']);
signup.__set__('jwt', mockJwt);

const req = {
  body: {
    firstName: 'Joe',
    lastName: 'Foo',
    email: 'joe@foo.com',
    username: 'joe',
    password: 'foo'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('signup', () => {
  it('should sign up a user', async () => {
    mockPasswords.hashPassword.and.returnValue('hashed_password');

    mockUser.create.and.returnValue({
      firstName: 'Joe',
      lastName: 'Foo',
      email: 'joe@foo.com',
      username: 'joe',
      password: 'hashed_password',
      admin: false
    });

    mockJwt.sign.and.returnValue('jwt_token');
    mockJwt.jwtExpireTime = 3600;

    await signup.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      token: 'jwt_token',
      expiresIn: 3600,
      user: {
        firstName: 'Joe',
        lastName: 'Foo',
        username: 'joe',
        email: 'joe@foo.com',
        admin: false
      }
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockPasswords.hashPassword.and.returnValue('hashed_password');
    mockUser.create.and.throwError('error');

    await signup.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
