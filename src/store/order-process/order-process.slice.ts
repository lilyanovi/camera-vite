import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { postOrderPhoneAction } from '../api-actions';
import { OrderProcess } from '../../types/order-process';

const initialState: OrderProcess = {
  statusLoading: StatusLoading.None,
  error: '',
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(postOrderPhoneAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(postOrderPhoneAction.fulfilled, (state) => {
        state.statusLoading = StatusLoading.Success;
      })
      .addCase(postOrderPhoneAction.rejected, (state, action) => {
        state.statusLoading = StatusLoading.Failed;
        state.error = String(action.error.message);
      });
  }
});

export const {clearError} = orderProcess.actions;
