import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { postOrderPhoneAction } from '../api-actions';
import { OrderProcess } from '../../types/order-process';

const initialState: OrderProcess = {
  statusLoading: StatusLoading.Loading,
};

export const orderProcess = createSlice({
  name: NameSpace.Order,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postOrderPhoneAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(postOrderPhoneAction.fulfilled, (state) => {
        state.statusLoading = StatusLoading.Success;
      })
      .addCase(postOrderPhoneAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      });
  }
});
