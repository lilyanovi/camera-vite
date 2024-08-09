import { NameSpace, StatusLoading } from '../../const';
import { makeFakeReview } from '../../mocks';
import { selectError, selectSortReviews, selectStatusLoadingReview } from './review-process.selectors';

describe('ReviewsProcess selectors', () => {
  const state = {
    [NameSpace.Reviews]: {
      sortReviews: [makeFakeReview()],
      statusLoading: StatusLoading.Loading,
      error: ''
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Reviews];
    const result = selectStatusLoadingReview(state);
    expect(result).toBe(statusLoading);
  });
  it('should return sortReviews from state', () => {
    const { sortReviews} = state[NameSpace.Reviews];
    const result = selectSortReviews(state);
    expect(result).toEqual(sortReviews);
  });
  it('should return error from state', () => {
    const { error} = state[NameSpace.Reviews];
    const result = selectError(state);
    expect(result).toEqual(error);
  });
});
