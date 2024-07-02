import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Categories, Levels, NameSpace, PER_PAGE_CAMERAS_COUNT, SortDirections, SortOption, START_PAGE, StatusLoading, Types } from '../../const';
import { CamerasProcess } from '../../types/cameras-process';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';
import { getFilteredCamerasList, getSortCamerasList } from '../../utils';

const initialState: CamerasProcess = {
  cameras: [],
  promoProducts: [],
  statusLoading: StatusLoading.Loading,
  filteredCameras: [],
  sort: SortOption.sortPrice,
  direction: SortDirections.up,
  currentCamerasList: [],
  currentPage: START_PAGE,
  visiblePages: [],
};

export const camerasProcess = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {
    changeSortOption: (state, action: PayloadAction<{sort: SortOption}>) => {
      state.sort = action.payload.sort;
      camerasProcess.actions.sortCameras();
      camerasProcess.actions.getCurrentCamerasList();
    },
    changeSortDirection: (state, action: PayloadAction<{direction: SortDirections}>) => {
      state.direction = action.payload.direction;
      camerasProcess.actions.sortCameras();
      camerasProcess.actions.getCurrentCamerasList();
    },
    changeCurrentPage: (state, action: PayloadAction<{currentPage: number}>) => {
      state.currentPage = action.payload.currentPage;
      camerasProcess.actions.getCurrentCamerasList();
    },
    changeVisiblePages: (state, action: PayloadAction<{visiblePages: number[]}>) => {
      state.visiblePages = action.payload.visiblePages;
    },
    sortCameras: (state) => {
      state.filteredCameras = getSortCamerasList(state.sort, state.filteredCameras, state.direction);
    },
    filterCameras: (state, action: PayloadAction<{price: number | null; priceUp: number | null; level: Levels[]; category: Categories | null; type: Types[]}>) => {
      state.filteredCameras = getFilteredCamerasList(state.cameras, action.payload.price, action.payload.priceUp, action.payload.category, action.payload.type, action.payload.level);
    },
    getCurrentCamerasList: (state) => {
      const lastIndex = state.currentPage * PER_PAGE_CAMERAS_COUNT;
      const firstIndex = lastIndex - PER_PAGE_CAMERAS_COUNT;
      state.currentCamerasList = state.filteredCameras.slice(firstIndex, lastIndex);
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

export const {sortCameras, filterCameras, changeSortDirection, changeSortOption, getCurrentCamerasList, changeCurrentPage, changeVisiblePages} = camerasProcess.actions;
