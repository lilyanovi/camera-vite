import { NameSpace, StatusLoading } from '../../const';
import { TCartCamera } from '../../types/camera';
import type { State } from '../../types/state';

const selectCart = (state: Pick<State, NameSpace.Cart>): TCartCamera[]=> state[NameSpace.Cart].cart;

const selectPromo = (state: Pick<State, NameSpace.Cart>): string => state[NameSpace.Cart].promoCode;

const selectStatusLoadingCheck = (state: Pick<State, NameSpace.Cart>): StatusLoading => state[NameSpace.Cart].statusLoadingCheck;

const selectError = (state: Pick<State, NameSpace.Cart>): string => state[NameSpace.Cart].error;

const selectDiscountByCoupon = (state: Pick<State, NameSpace.Cart>): number => state[NameSpace.Cart].discountByCoupon;

export {selectCart, selectPromo, selectStatusLoadingCheck, selectError, selectDiscountByCoupon};
