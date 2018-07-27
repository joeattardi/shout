const { Op } = require('sequelize');
const rewire = require('rewire');

const { Result } = require('../../../api');

const deleteRoom = rewire('./delete-room');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const mockRoom = jasmine.createSpyObj('Room', ['destroy']);
deleteRoom.__set__('Room', mockRoom);

const mockGetRoomForSlug = jasmine.createSpy('getRoomForSlug');
deleteRoom.__set__('getRoomForSlug', mockGetRoomForSlug);

const req = {
  params: {
    room: 'general'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('delete-room', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should delete the room and return a 200', async () => {
    mockGetRoomForSlug.and.returnValue({ slug: 'general' });

    await deleteRoom.handler(req, res);
    expect(mockRoom.destroy).toHaveBeenCalled();
    expect(mockRoom.destroy.calls.argsFor(0)[0].where.slug[Op.iLike]).toBe('general');
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it('should return a 404 if the room does not exist', async () => {
    mockGetRoomForSlug.and.returnValue(null);

    await deleteRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.NOT_FOUND,
      message: 'Room not found'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockGetRoomForSlug.and.throwError('error');

    await deleteRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
