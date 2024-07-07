import { Category, Level, SortDirection, SortOption, StatusLoading, Type } from '../const';
import { TCamera, TPromoProduct } from './camera';

export type FilteredSettingsType = {
  price: number | null;
  priceUp: number | null;
  level: Level[];
  category: Category | null;
  type: Type[];
};

export type CamerasProcess = {
  cameras: TCamera[];
  promoProducts: TPromoProduct[];
  statusLoading: StatusLoading;
  sort: SortOption;
  direction: SortDirection;
  currentPage: number;
  filteredSettings: FilteredSettingsType;
};
