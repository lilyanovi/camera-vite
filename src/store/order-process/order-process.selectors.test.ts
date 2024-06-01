import { NameSpace, StatusLoading } from '../../const';
import { selectStatusLoading } from './order-process.selectors';

describe('OrderProcess selectors', () => {
  const state = {
    [NameSpace.Order]: {
      statusLoading: StatusLoading.Success,
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Order];
    const result = selectStatusLoading(state);
    expect(result).toBe(statusLoading);
  });
});
