import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortDirections, SortOption, StatusLoading } from '../../const';
import { CamerasProcess } from '../../types/cameras-process';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';
import { getSortCamerasList } from '../../utils';

const initialState: CamerasProcess = {
  cameras: [],
  promoProducts: [],
  statusLoading: StatusLoading.Loading,
  sortedCameras: [],
};

export const camerasProcess = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    sortCameras: (state, action: PayloadAction<{sort: SortOption; direction: SortDirections}>) => {
      state.sortedCameras = getSortCamerasList(action.payload.sort, state.cameras, action.payload.direction);
    }
  },
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

export const {sortCameras} = camerasProcess.actions;
