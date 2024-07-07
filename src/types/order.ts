import { CouponType } from '../const';

export type TOrder = {
  camerasIds: number[];
  coupon: CouponType | null;
  tel: string;
};
