import { createSelector } from 'reselect';
import { NameSpace, PER_PAGE_CAMERAS_COUNT, SortDirection, SortOption, StatusLoading } from '../../const';
import { TCamera, TPromoProduct } from '../../types/camera';
import type { State } from '../../types/state';
import { getFilteredCamerasList, getSortCamerasList } from '../../utils';
import { FilteredSettingsType } from '../../types/cameras-process';

const selectCameras = (state: Pick<State, NameSpace.Cameras>): TCamera[] => state[NameSpace.Cameras].cameras;

const selectSortOption = (state: Pick<State, NameSpace.Cameras>): SortOption => state[NameSpace.Cameras].sort;

const selectSortDirection = (state: Pick<State, NameSpace.Cameras>): SortDirection => state[NameSpace.Cameras].direction;

const selectPromoProducts = (state: Pick<State, NameSpace.Cameras>): TPromoProduct[] => state[NameSpace.Cameras].promoProducts;

const selectStatusLoading = (state: Pick<State, NameSpace.Cameras>): StatusLoading => state[NameSpace.Cameras].statusLoading;

const selectCurrentPage = (state: Pick<State, NameSpace.Cameras>): number => state[NameSpace.Cameras].currentPage;

const selectFilteredSettings = (state: Pick<State, NameSpace.Cameras>): FilteredSettingsType => state[NameSpace.Cameras].filteredSettings;

const selectFilteredCameras = createSelector(
  [selectCameras, selectFilteredSettings],
  (cameras, settings) => getFilteredCamerasList(cameras, settings.price, settings.priceUp, settings.category, settings.type, settings.level));

const selectSortCameras = createSelector(
  [selectSortOption, selectFilteredCameras, selectSortDirection],
  (sort, filteredCameras, direction) => getSortCamerasList(sort, filteredCameras, direction));

const selectCurrentCamerasList = createSelector(
  [selectSortCameras, selectCurrentPage],
  (sortCameras, currentPage) => {
    const lastIndex = currentPage * PER_PAGE_CAMERAS_COUNT;
    const firstIndex = lastIndex - PER_PAGE_CAMERAS_COUNT;
    return sortCameras.slice(firstIndex, lastIndex);
  }
);

export {selectCameras, selectPromoProducts, selectStatusLoading, selectSortDirection, selectSortOption, selectCurrentPage, selectFilteredSettings, selectFilteredCameras, selectCurrentCamerasList, selectSortCameras};
