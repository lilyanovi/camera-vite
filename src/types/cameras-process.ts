import { StatusLoading } from '../const';
import { TCamera, TPromoProduct } from './camera';

export type CamerasProcess = {
  cameras: TCamera[];
  sortedCameras: TCamera[];
  promoProducts: TPromoProduct[];
  statusLoading: StatusLoading;
};
