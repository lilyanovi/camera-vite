import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { fetchProductByIdAction, fetchSimilarProductsByIdAction } from '../api-actions';
import type { ProductProcess } from '../../types/product-process';

const initialState: ProductProcess = {
  currentProduct: null,
  statusLoading: StatusLoading.Loading,
  similarProducts: []
};

export const productProcess = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProductByIdAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchProductByIdAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductByIdAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(fetchSimilarProductsByIdAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      });
  }
});
