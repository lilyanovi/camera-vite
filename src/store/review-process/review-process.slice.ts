import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { ReviewProcess } from '../../types/review-process';
import { fetchReviewsListAction, postReviewAction } from '../api-actions';
import { getSortByDateReviews } from '../../utils';

const initialState: ReviewProcess = {
  sortReviews: [],
  statusLoading: StatusLoading.Loading,
  error: ''
};

export const reviewProcess = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    changeStatusLoading: (state, action: PayloadAction<{status: StatusLoading} >) => {
      state.statusLoading = action.payload.status;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
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
      })
      .addCase(postReviewAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(postReviewAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.sortReviews.push(action.payload);
        state.sortReviews = getSortByDateReviews(state.sortReviews);
      })
      .addCase(postReviewAction.rejected, (state, action) => {
        state.statusLoading = StatusLoading.Failed;
        state.error = action.error.message ?? '';
      });
  }
});

export const {changeStatusLoading, clearError} = reviewProcess.actions;

