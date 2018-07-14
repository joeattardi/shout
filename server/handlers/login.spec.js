const rewire = require('rewire');

const logger = require('../logger');
logger.transports.forEach(t => (t.silent = true));

const login = rewire('./login');
const { Result } = require('../api');

const mockUser = jasmine.createSpyObj('User', ['findOne']);
login.__set__('User', mockUser);

const mockJwt = jasmine.createSpyObj('jwt', ['sign']);
login.__set__('jwt', mockJwt);

const mockPasswords = jasmine.createSpyObj('passwords', ['validatePassword']);
login.__set__('passwords', mockPasswords);

const req = {
  body: {
    username: 'joe',
    password: 'foo'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('login', () => {
  it('should issue a token and return the user if login was successful', async () => {
    mockUser.findOne.and.returnValue({
      username: 'joe',
      email: 'joe@foo.com',
      firstName: 'Joe',
      lastName: 'Foo',
      admin: false,
      password: 'abc123'
    });

    mockPasswords.validatePassword.and.returnValue(true);

    mockJwt.sign.and.returnValue('my-jwt-token');
    mockJwt.jwtExpireTime = 3600;

    await login.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.LOGGED_IN,
      token: 'my-jwt-token',
      expiresIn: 3600,
      user: {
        username: 'joe',
        email: 'joe@foo.com',
        firstName: 'Joe',
        lastName: 'Foo',
        admin: false
      }
    });
  });

  it('should return a 403 if the user is not found', async () => {
    mockUser.findOne.and.returnValue(null);
    await login.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.LOGIN_INCORRECT,
      message: 'Login incorrect'
    });
  });

  it('should return a 403 if the password is incorrect', async () => {
    mockUser.findOne.and.returnValue({
      username: 'joe',
      email: 'joe@foo.com',
      firstName: 'Joe',
      lastName: 'Foo',
      admin: false,
      password: 'abc123'
    });

    mockPasswords.validatePassword.and.returnValue(false);

    await login.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.LOGIN_INCORRECT,
      message: 'Login incorrect'
    });
  });

  it('should return a 500 if there was an error', async () => {
    mockUser.findOne.and.throwError('error');
    await login.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
