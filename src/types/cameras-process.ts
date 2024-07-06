import { Categories, Levels, SortDirections, SortOption, StatusLoading, Types } from '../const';
import { TCamera, TPromoProduct } from './camera';

export type FilteredSettingsType = {
  price: number | null;
  priceUp: number | null;
  level: Levels[];
  category: Categories | null;
  type: Types[];
};

export type CamerasProcess = {
  cameras: TCamera[];
  promoProducts: TPromoProduct[];
  statusLoading: StatusLoading;
  sort: SortOption;
  direction: SortDirections;
  currentPage: number;
  filteredSettings: FilteredSettingsType;
};
