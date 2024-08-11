import { NameSpace, StatusLoading } from '../../const';
import { selectError, selectStatusLoadingPost } from './order-process.selectors';

describe('OrderProcess selectors', () => {
  const state = {
    [NameSpace.Order]: {
      statusLoading: StatusLoading.None,
      error: ''
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Order];
    const result = selectStatusLoadingPost(state);
    expect(result).toBe(statusLoading);
  });
  it('should return error from state', () => {
    const { error } = state[NameSpace.Order];
    const result = selectError(state);
    expect(result).toBe(error);
  });
});
