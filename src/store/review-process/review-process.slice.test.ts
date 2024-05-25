import { StatusLoading } from '../../const';
import { makeFakeId, makeFakeReview } from '../../mocks';
import { fetchReviewsListAction } from '../api-actions';
import { reviewProcess } from './review-process.slice';

describe('ReviewProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      sortReviews: [makeFakeReview()],
      statusLoading: StatusLoading.Loading,
    };
    const result = reviewProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Loading,
    };
    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "fetchReviewsListAction.pending"', () => {
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Loading,
    };
    const result = reviewProcess.reducer(undefined, fetchReviewsListAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "sortReviews" to array with "fetchReviewsListAction.fulfilled"', () => {
    const mockReviews = makeFakeReview();
    const mockId = makeFakeId();
    const expectedState = {
      sortReviews: [mockReviews],
      statusLoading: StatusLoading.Success,
    };
    const result = reviewProcess.reducer(undefined, fetchReviewsListAction.fulfilled(
      [mockReviews], '', mockId
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "fetchReviewsListAction.rejected"', () => {
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Failed,
    };
    const result = reviewProcess.reducer(undefined, fetchReviewsListAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
