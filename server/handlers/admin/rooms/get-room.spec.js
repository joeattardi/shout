const rewire = require('rewire');

const { Result } = require('../../../api');

const getRoom = rewire('./get-room');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const mockGetRoomForSlug = jasmine.createSpy('getRoomForSlug');
getRoom.__set__('getRoomForSlug', mockGetRoomForSlug);

const req = {
  params: {
    room: 'general'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('get-room', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should return a 200 with the room', async () => {
    mockGetRoomForSlug.and.returnValue({
      id: 1,
      name: 'General',
      description: 'General discussion',
      slug: 'general'
    });

    await getRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      room: {
        id: 1,
        name: 'General',
        description: 'General discussion',
        slug: 'general'
      }
    });
  });

  it('should return a 404 if the room does not exist', async () => {
    mockGetRoomForSlug.and.returnValue(null);

    await getRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.NOT_FOUND,
      message: 'Room not found'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockGetRoomForSlug.and.throwError('error');

    await getRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
