import { StatusLoading } from '../../const';
import { makeFakeId, makeFakeReview, makeFakeReviewByPost, makeFakeReviewByServer } from '../../mocks';
import { fetchReviewsListAction, postReviewAction } from '../api-actions';
import { clearError, reviewProcess } from './review-process.slice';

describe('ReviewProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      sortReviews: [makeFakeReview()],
      statusLoading: StatusLoading.Loading,
      error: ''
    };
    const result = reviewProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Loading,
      error: ''
    };
    const result = reviewProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "fetchReviewsListAction.pending"', () => {
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Loading,
      error: ''
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
      error: ''
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
      error: ''
    };
    const result = reviewProcess.reducer(undefined, fetchReviewsListAction.rejected);
    expect(result).toEqual(expectedState);
  });
  it('should clear "error" with "clearError" action', () => {
    const fakeError = 'error';
    const initialState = {
      sortReviews: [],
      statusLoading: StatusLoading.Failed,
      error: fakeError
    };
    const result = reviewProcess.reducer(initialState, clearError());
    expect(result.error).toBe('');
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "postReviewAction.pending"', () => {
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Loading,
      error: ''
    };
    const result = reviewProcess.reducer(undefined, postReviewAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "sortReviews" to array with "postReviewAction.fulfilled"', () => {
    const mockReviewByPost = makeFakeReviewByPost();
    const mockReviewByServer = makeFakeReviewByServer();
    const expectedState = {
      sortReviews: [{...mockReviewByPost, ...mockReviewByServer}],
      statusLoading: StatusLoading.Success,
      error: ''
    };
    const result = reviewProcess.reducer(undefined, postReviewAction.fulfilled(
      {...mockReviewByPost, ...mockReviewByServer}, '', mockReviewByPost
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "postReviewAction.rejected"', () => {
    const fakeError = 'error message' as unknown as Error;
    const mockReviewByPost = makeFakeReviewByPost();
    const expectedState = {
      sortReviews: [],
      statusLoading: StatusLoading.Failed,
      error: fakeError
    };
    const result = reviewProcess.reducer(undefined, postReviewAction.rejected(
      fakeError, '', mockReviewByPost
    ));
    expect(result).toEqual(expectedState);
  });

});
