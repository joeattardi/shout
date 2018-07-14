const rewire = require('rewire');

const { Result } = require('../api');

const usernameCheck = rewire('./username-check');

const logger = require('../logger');
logger.transports.forEach(t => (t.silent = true));

const mockUser = jasmine.createSpyObj('User', ['findOne']);
usernameCheck.__set__('User', mockUser);

const req = {
  query: {
    username: 'joe'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('username-check', () => {
  it('should return AVAILABLE if the username is available', async () => {
    mockUser.findOne.and.returnValue(null);
    await usernameCheck.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.AVAILABLE,
      message: 'Username is available'
    });
  });

  it('should return TAKEN if the username is taken', async () => {
    mockUser.findOne.and.returnValue({});
    await usernameCheck.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.TAKEN,
      message: 'Username is taken'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockUser.findOne.and.throwError('error');
    await usernameCheck.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
