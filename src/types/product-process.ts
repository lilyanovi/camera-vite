import { StatusLoading } from '../const';
import { TCamera } from './camera';

export type ProductProcess = {
  currentProduct: TCamera | null;
  statusLoading: StatusLoading;
  similarProducts: TCamera[];
};
