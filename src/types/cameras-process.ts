import { SortDirections, SortOption, StatusLoading } from '../const';
import { TCamera, TPromoProduct } from './camera';

export type CamerasProcess = {
  cameras: TCamera[];
  filteredCameras: TCamera[];
  promoProducts: TPromoProduct[];
  statusLoading: StatusLoading;
  sort: SortOption;
  direction: SortDirections;
  currentCamerasList: TCamera[];
  currentPage: number;
  visiblePages: number[];
};
