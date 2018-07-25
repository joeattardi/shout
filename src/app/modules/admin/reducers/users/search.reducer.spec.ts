import { searchReducer } from './search.reducer';
import { SearchUsers } from '../../actions';

describe('Admin Users Search Reducer', () => {
  it('should set the search term', () => {
    const newState = searchReducer('', new SearchUsers('foo'));
    expect(newState).toEqual('foo');
  });
});
