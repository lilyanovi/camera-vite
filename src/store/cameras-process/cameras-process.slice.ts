import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import { CamerasProcess } from '../../types/cameras-process';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';

const initialState: CamerasProcess = {
  cameras: [],
  promoProducts: [],
  statusLoading: StatusLoading.Loading,

};

export const camerasProcess = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCamerasListAction.pending, (state) => {
        state.statusLoading = StatusLoading.Loading;
      })
      .addCase(fetchCamerasListAction.fulfilled, (state, action) => {
        state.statusLoading = StatusLoading.Success;
        state.cameras = action.payload;
      })
      .addCase(fetchCamerasListAction.rejected, (state) => {
        state.statusLoading = StatusLoading.Failed;
      })
      .addCase(fetchPromoProductsListAction.fulfilled, (state, action) => {
        state.promoProducts = action.payload;
      });
  }
});
