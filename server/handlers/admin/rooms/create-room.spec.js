const rewire = require('rewire');

const { Result } = require('../../../api');

const createRoom = rewire('./create-room');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const mockRoom = jasmine.createSpyObj('Room', ['create']);
createRoom.__set__('Room', mockRoom);

const mockGetUniqueSlug = () => 'general';
createRoom.__set__('getUniqueSlug', mockGetUniqueSlug);

const mockGetRoomForName = jasmine.createSpy('getRoomForName');
createRoom.__set__('getRoomForName', mockGetRoomForName);

const req = {
  body: {
    name: 'General',
    description: 'General discussion'
  }
};

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('create-room', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
  });

  it('should create the room and return a 201', async () => {
    mockGetRoomForName.and.returnValue(null);
    mockRoom.create.and.returnValue({
      id: 1,
      name: 'General',
      description: 'General discussion',
      slug: 'general'
    });

    await createRoom.handler(req, res);
    expect(mockRoom.create).toHaveBeenCalledWith({
      name: 'General',
      slug: 'general',
      description: 'General discussion'
    });
    expect(res.status).toHaveBeenCalledWith(201);
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

  it('should return a 400 if the room name is taken', async () => {
    mockGetRoomForName.and.returnValue({
      id: 1,
      name: 'General',
      description: 'General discussion',
      slug: 'general'
    });

    await createRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.TAKEN,
      message: 'A room already exists with that name'
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockGetRoomForName.and.throwError('error');

    await createRoom.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
