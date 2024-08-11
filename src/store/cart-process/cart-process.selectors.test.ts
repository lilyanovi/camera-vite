import { NameSpace, StatusLoading } from '../../const';
import { selectCart, selectDiscountByCoupon, selectError, selectPromo, selectStatusLoadingCheck } from './cart-process.selectors';

describe('CartProcess selectors', () => {
  const state = {
    [NameSpace.Cart]: {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoadingCheck } = state[NameSpace.Cart];
    const result = selectStatusLoadingCheck(state);
    expect(result).toBe(statusLoadingCheck);
  });
  it('should return error from state', () => {
    const { error } = state[NameSpace.Cart];
    const result = selectError(state);
    expect(result).toBe(error);
  });
  it('should return cart from state', () => {
    const { cart } = state[NameSpace.Cart];
    const result = selectCart(state);
    expect(result).toEqual(cart);
  });
  it('should return promo from state', () => {
    const { promoCode } = state[NameSpace.Cart];
    const result = selectPromo(state);
    expect(result).toBe(promoCode);
  });
  it('should return discountByCoupon from state', () => {
    const { discountByCoupon } = state[NameSpace.Cart];
    const result = selectDiscountByCoupon(state);
    expect(result).toBe(discountByCoupon);
  });
});
