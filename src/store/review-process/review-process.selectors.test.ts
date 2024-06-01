import { NameSpace, StatusLoading } from '../../const';
import { makeFakeReview } from '../../mocks';
import { selectSortReviews, selectStatusLoading } from './review-process.selectors';

describe('ReviewsProcess selectors', () => {
  const state = {
    [NameSpace.Reviews]: {
      sortReviews: [makeFakeReview()],
      statusLoading: StatusLoading.Loading,
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Reviews];
    const result = selectStatusLoading(state);
    expect(result).toBe(statusLoading);
  });
  it('should return sortReviews from state', () => {
    const { sortReviews} = state[NameSpace.Reviews];
    const result = selectSortReviews(state);
    expect(result).toEqual(sortReviews);
  });
});
