import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, Levels, NameSpace, SortDirections, SortOption, StatusLoading, Types } from '../../const';
import { CamerasProcess } from '../../types/cameras-process';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';
import { getFilteredCamerasList, getSortCamerasList } from '../../utils';

const initialState: CamerasProcess = {
  cameras: [],
  promoProducts: [],
  statusLoading: StatusLoading.Loading,
  filteredCameras: [],
  sort: SortOption.sortPrice,
  direction: SortDirections.up
};

export const camerasProcess = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    changeSortOption: (state, action: PayloadAction<{sort: SortOption}>) => {
      state.sort = action.payload.sort;
    },
    changeSortDirection: (state, action: PayloadAction<{direction: SortDirections}>) => {
      state.direction = action.payload.direction;
    },
    sortCameras: (state) => {
      state.filteredCameras = getSortCamerasList(state.sort, state.filteredCameras, state.direction);
    },
    filterCameras: (state, action: PayloadAction<{price: number | null; priceUp: number | null; level: Levels[]; category: Categories | null; type: Types[]}>) => {
      state.filteredCameras = getFilteredCamerasList(state.cameras, action.payload.price, action.payload.priceUp, action.payload.category, action.payload.type, action.payload.level);
    },
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

export const {sortCameras, filterCameras, changeSortDirection, changeSortOption} = camerasProcess.actions;
