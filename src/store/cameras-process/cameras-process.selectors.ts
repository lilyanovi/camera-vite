import { NameSpace, SortDirections, SortOption, StatusLoading } from '../../const';
import { TCamera, TPromoProduct } from '../../types/camera';
import type { State } from '../../types/state';

const selectCameras = (state: Pick<State, NameSpace.Cameras>): TCamera[] => state[NameSpace.Cameras].cameras;

const selectFilteredCameras = (state: Pick<State, NameSpace.Cameras>): TCamera[] => state[NameSpace.Cameras].filteredCameras;

const selectCurrentCamerasList = (state: Pick<State, NameSpace.Cameras>): TCamera[] => state[NameSpace.Cameras].currentCamerasList;

const selectSortOption = (state: Pick<State, NameSpace.Cameras>): SortOption => state[NameSpace.Cameras].sort;

const selectSortDirection = (state: Pick<State, NameSpace.Cameras>): SortDirections => state[NameSpace.Cameras].direction;

const selectPromoProducts = (state: Pick<State, NameSpace.Cameras>): TPromoProduct[] => state[NameSpace.Cameras].promoProducts;

const selectStatusLoading = (state: Pick<State, NameSpace.Cameras>): StatusLoading => state[NameSpace.Cameras].statusLoading;

const selectCurrentPage = (state: Pick<State, NameSpace.Cameras>): number => state[NameSpace.Cameras].currentPage;

const selectVisiblePages = (state: Pick<State, NameSpace.Cameras>): number[] => state[NameSpace.Cameras].visiblePages;

export {selectCameras, selectPromoProducts, selectStatusLoading, selectFilteredCameras, selectSortDirection, selectSortOption, selectCurrentCamerasList, selectCurrentPage, selectVisiblePages};
