import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { ReviewProcess } from '../../types/review-process';
import { fetchReviewsListAction } from '../api-actions';

const initialState: ReviewProcess = {
  currentReviews: null,
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
        state.currentReviews = action.payload;
      })
      .addCase(fetchReviewsListAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      });
  }
});
