const rewire = require('rewire');

const { Result } = require('../../api');

const deleteUser = rewire('./delete-user');

const mockUser = jasmine.createSpyObj('User', ['destroy']);
deleteUser.__set__('User', mockUser);

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('delete-user', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should delete the user and return a 200', async () => {
    const req = {
      params: {
        userId: 1
      },
      user: {
        id: 2
      }
    };

    await deleteUser.handler(req, res);
    expect(mockUser.destroy).toHaveBeenCalledWith({
      where: {
        id: 1
      }
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return a 400 if the user tries to delete themselves', async () => {
    const req = {
      params: {
        userId: 1
      },
      user: {
        id: 1
      }
    };

    await deleteUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'Cannot delete the currently logged in user'
    });
  });

  it('should return a 500 if there is an error', async () => {
    const req = {
      params: {
        userId: 1
      },
      user: {
        id: 2
      }
    };

    mockUser.destroy.and.throwError('error');
    await deleteUser.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
