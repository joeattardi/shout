const rewire = require('rewire');
const { Op } = require('sequelize');

const { Result } = require('../../../api');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const rooms = rewire('./rooms');

const mockRoom = jasmine.createSpyObj('Room', ['count', 'findAll']);
rooms.__set__('Room', mockRoom);

const res = jasmine.createSpyObj('res', ['status', 'json']);
res.status.and.returnValue(res);

describe('rooms', () => {
  beforeEach(() => {
    res.status.calls.reset();
    res.json.calls.reset();
    mockRoom.findAll.calls.reset();
  });

  it('should return a 200 with the list of rooms', async () => {
    mockRoom.findAll.and.returnValue([
      {
        name: 'General',
        slug: 'general',
        description: 'General discussion'
      }
    ]);
    mockRoom.count.and.returnValue(1);

    const req = {
      query: {}
    };

    await rooms.handler(req, res);
    expect(mockRoom.findAll).toHaveBeenCalledWith({
      order: [['name', 'asc']],
      offset: 0,
      limit: 25
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      rooms: [
        {
          name: 'General',
          slug: 'general',
          description: 'General discussion'
        }
      ],
      total: 1
    });
  });

  it('should search the rooms if a query is specified', async () => {
    mockRoom.findAll.and.returnValue([
      {
        name: 'General',
        slug: 'general',
        description: 'General discussion'
      }
    ]);
    mockRoom.count.and.returnValue(1);

    const req = {
      query: {
        query: 'gen'
      }
    };

    await rooms.handler(req, res);
    expect(mockRoom.findAll).toHaveBeenCalled();
    expect(mockRoom.findAll.calls.argsFor(0)[0].where[Op.or][0].name[Op.iLike]).toBe('%gen%');
    expect(mockRoom.findAll.calls.argsFor(0)[0].where[Op.or][1].slug[Op.iLike]).toBe('%gen%');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.SUCCESS,
      rooms: [
        {
          name: 'General',
          slug: 'general',
          description: 'General discussion'
        }
      ],
      total: 1
    });
  });

  it('should return a 500 if there is an error', async () => {
    mockRoom.findAll.and.throwError('error');
    const req = {
      query: {}
    };

    await rooms.handler(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      result: Result.ERROR,
      message: 'An unexpected error has occurred'
    });
  });
});
