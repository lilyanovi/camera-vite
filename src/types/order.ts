import { CouponTypes } from '../const';

export type TOrder = {
  camerasIds: number[];
  coupon: CouponTypes | null;
  tel: string;
};
