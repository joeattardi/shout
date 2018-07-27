const rewire = require('rewire');

const { Result } = require('../../../api');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const updateRoom = rewire('./update-room');

const mockGetRoomForSlug = jasmine.createSpy('getRoomForSlug');
updateRoom.__set__('getRoomForSlug', mockGetRoomForSlug);

const mockGetRoomForName = jasmine.createSpy('getRoomForName');
updateRoom.__set__('getRoomForName', mockGetRoomForName);

const mockGetUniqueSlug = jasmine.createSpy('getUniqueSlug');
updateRoom.__set__('getUniqueSlug', mockGetUniqueSlug);

const req = {
  params: {
    room: 'general'
  },
  body: {
    name: 'Foo',
    description: 'foo'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('update-room', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
    mockGetUniqueSlug.calls.reset();
  });

  it('should update the room and return a 200', async () => {
    const room = jasmine.createSpyObj('room', ['save']);
    room.id = 1;

    mockGetRoomForSlug.and.returnValue(room);
    mockGetRoomForName.and.returnValue(room);
    mockGetUniqueSlug.and.returnValue('foo');

    await updateRoom.handler(req, res);

    expect(room.name).toBe('Foo');
    expect(room.slug).toBe('foo');
    expect(room.description).toBe('foo');
    expect(room.save).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      message: 'Room updated'
    });
  });

  it('should return a 404 if the room does not exist', async () => {
    mockGetRoomForSlug.and.returnValue(null);

    await updateRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.NOT_FOUND,
      message: 'Room not found'
    });
  });

  it('should not generate a new slug if the room name does not change', async () => {
    const room = jasmine.createSpyObj('room', ['save']);
    room.name = 'General';
    room.id = 1;

    mockGetRoomForSlug.and.returnValue(room);
    mockGetRoomForName.and.returnValue(room);
    mockGetUniqueSlug.and.returnValue('foo');

    const req = {
      params: {
        room: 'general'
      },
      body: {
        name: 'General',
        description: 'General discussion'
      }
    };

    await updateRoom.handler(req, res);
    expect(mockGetUniqueSlug).not.toHaveBeenCalled();
  });

  it('should return a 400 if the name is already taken by a different room', async () => {
    const room = {
      id: 1,
      name: 'General',
      slug: 'general'
    };

    const otherRoom = {
      id: 2,
      name: 'Foo',
      slug: 'foo'
    };

    mockGetRoomForSlug.and.returnValue(room);
    mockGetRoomForName.and.returnValue(otherRoom);

    await updateRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.TAKEN,
      message: 'A room already exists with that name'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockGetRoomForSlug.and.throwError('error');

    await updateRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
