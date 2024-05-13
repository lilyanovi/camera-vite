import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { fetchQuestByIdAction } from '../api-actions';
import { ProductProcess } from '../../types/product-process';

const initialState: ProductProcess = {
  currentProduct: null,
  statusLoading: StatusLoading.Loading,
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestByIdAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchQuestByIdAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.currentQuest = action.payload;
      })
      .addCase(fetchQuestByIdAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      });
  }
});
