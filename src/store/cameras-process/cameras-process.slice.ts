import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortDirections, SortOption, START_PAGE, StatusLoading } from '../../const';
import { CamerasProcess, FilteredSettingsType } from '../../types/cameras-process';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';

const initialState: CamerasProcess = {
  cameras: [],
  promoProducts: [],
  statusLoading: StatusLoading.Loading,
  sort: SortOption.sortPrice,
  direction: SortDirections.up,
  currentPage: START_PAGE,
  filteredSettings: {
    price: null,
    priceUp: null,
    level: [],
    category: null,
    type: [],
  }
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
    changeCurrentPage: (state, action: PayloadAction<{currentPage: number}>) => {
      state.currentPage = action.payload.currentPage;
    },
    changeFilteredSettings: (state, action: PayloadAction<FilteredSettingsType>) => {
      state.filteredSettings = action.payload;
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

export const {changeSortDirection, changeSortOption, changeCurrentPage, changeFilteredSettings} = camerasProcess.actions;
