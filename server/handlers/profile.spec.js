const rewire = require('rewire');

const { Result } = require('../api');

const logger = require('../logger');
logger.transports.forEach(t => (t.silent = true));

const profile = rewire('./profile');

const mockUser = jasmine.createSpyObj('User', ['findOne']);
profile.__set__('User', mockUser);

const mockPasswords = jasmine.createSpyObj('passwords', ['validatePassword', 'hashPassword']);
profile.__set__('passwords', mockPasswords);

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);
res.json.and.returnValue(res);

describe('profile', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should update the user profile', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        currentPassword: 'abc123',
        newPassword: 'def456'
      }
    };

    const user = jasmine.createSpyObj(['save']);
    mockUser.findOne.and.returnValue(user);

    mockPasswords.validatePassword.and.returnValue(true);
    mockPasswords.hashPassword.and.returnValue('hashed_password');

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      message: 'Profile updated'
    });
    expect(user.save).toHaveBeenCalled();
    expect(user.firstName).toBe('Joe');
    expect(user.lastName).toBe('Foo');
    expect(user.email).toBe('joe@foo.com');
    expect(user.password).toBe('hashed_password');
  });

  it('should return a 400 if a new password is given but the current password is not', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        newPassword: 'def456'
      }
    };

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'Current password is required when changing password'
    });
  });

  it('should not return a 400 if no passwords are given', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com'
      }
    };

    const user = jasmine.createSpyObj(['save']);
    mockUser.findOne.and.returnValue(user);

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      message: 'Profile updated'
    });
  });

  it('should return a 403 if the current password is incorrect', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        currentPassword: 'abc123',
        newPassword: 'def456'
      }
    };

    const user = jasmine.createSpyObj(['save']);
    mockUser.findOne.and.returnValue(user);

    mockPasswords.validatePassword.and.returnValue(false);

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.LOGIN_INCORRECT,
      message: 'Current password is incorrect'
    });
  });

  it('should return a 500 if an error occurs while loading the user', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com',
        currentPassword: 'abc123',
        newPassword: 'def456'
      }
    };

    mockUser.findOne.and.throwError('error');

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });

  it('should return a 500 if an error occurs while saving the user', async () => {
    const req = {
      user: {
        sub: 'joe'
      },
      body: {
        firstName: 'Joe',
        lastName: 'Foo',
        email: 'joe@foo.com'
      }
    };

    const user = jasmine.createSpyObj(['save']);
    user.save.and.throwError('error');
    mockUser.findOne.and.returnValue(user);

    await profile.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
