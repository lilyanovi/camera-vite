import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { ReviewProcess } from '../../types/review-process';
import { fetchReviewsListAction } from '../api-actions';
import { getSortByDateReviews } from '../../utils';

const initialState: ReviewProcess = {
  sortReviews: [],
  statusLoading: StatusLoading.Loading,
};

export const reviewProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviewsListAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchReviewsListAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.sortReviews = getSortByDateReviews(action.payload);
      })
      .addCase(fetchReviewsListAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      });
  }
});
