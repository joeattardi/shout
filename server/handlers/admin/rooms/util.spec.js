const rewire = require('rewire');

const logger = require('../../../logger');
logger.transports.forEach(t => (t.silent = true));

const util = rewire('./util');

const mockRoom = jasmine.createSpyObj('Room', ['findOne']);
util.__set__('Room', mockRoom);

describe('util', () => {
  describe('getUniqueSlug', () => {
    it('should use the default slug if no room with that slug exists', async () => {
      mockRoom.findOne.and.returnValue(null);
      const uniqueSlug = await util.getUniqueSlug('General');
      expect(uniqueSlug).toBe('general');
    });

    it('should find the next available sequential slug', async () => {
      mockRoom.findOne.and.returnValues({ name: 'General', slug: 'general' }, { name: 'General!', slug: 'general-1' });
      const uniqueSlug = await util.getUniqueSlug('General!!!');
      expect(uniqueSlug).toBe('general-2');
    });
  });
});
