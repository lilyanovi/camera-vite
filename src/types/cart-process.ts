import { StatusLoading } from '../const';
import { TCartCamera } from './camera';

export type CartProcess = {
  cart: TCartCamera[];
  promoCode: string;
  statusLoadingCheck: StatusLoading;
  discountByCoupon: number;
  error: string;
};
