import { StatusLoading } from '../../const';
import { makeFakeCartCamera, makeFakeId } from '../../mocks';
import { checkCouponAction } from '../api-actions';
import { addToCart, cartProcess, changePromo, changeQuantity, clearCart, clearError, decreaseQuantity, increaseQuantity, removeToCart } from './cart-process.slice';

describe('CartProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoadingCheck" to "StatusLoading.Loading" with "checkCouponAction.pending"', () => {
    const expectedState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.Loading,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(undefined, checkCouponAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "promoCode" to string,  "discountByCoupon" to number with "checkCouponAction.fulfilled"', () => {
    const fakePromo = 'promo';
    const fakeDiscount = 10;
    const expectedState = {
      cart: [],
      promoCode: fakePromo,
      statusLoadingCheck: StatusLoading.Success,
      discountByCoupon: fakeDiscount,
      error: ''
    };
    const result = cartProcess.reducer(undefined, checkCouponAction.fulfilled(
      fakeDiscount, '', fakePromo
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "checkCouponAction.rejected"', () => {
    const fakeError = 'error message' as unknown as Error;
    const mockIdByPost = makeFakeId();
    const expectedState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.Failed,
      discountByCoupon: 0,
      error: fakeError
    };
    const result = cartProcess.reducer(undefined, checkCouponAction.rejected(
      fakeError, '', mockIdByPost
    ));
    expect(result).toEqual(expectedState);
  });
  it('should change "cart" with "addToCart" action', () => {

    const initialState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const fakeCartItem = makeFakeCartCamera();
    const result = cartProcess.reducer(initialState, addToCart({
      cartItem: fakeCartItem
    }));
    expect(result.cart).toEqual([fakeCartItem]);
  });
  it('should remove in the "cart" with "removeToCart" action', () => {
    const fakeFirstCartItem = makeFakeCartCamera();
    const fakeSecondCartItem = makeFakeCartCamera();
    const initialState = {
      cart: [fakeFirstCartItem, fakeSecondCartItem],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(initialState, removeToCart({
      id: fakeFirstCartItem.id
    }));
    expect(result.cart).toEqual([fakeSecondCartItem]);
  });
  it('should increase count in the "cart" with "increaseQuantity" action', () => {
    const fakeFirstCartItem = makeFakeCartCamera();
    const initialState = {
      cart: [fakeFirstCartItem],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const expectedCart = [{...fakeFirstCartItem}];
    expectedCart[0].count ++;
    const result = cartProcess.reducer(initialState, increaseQuantity({
      id: fakeFirstCartItem.id
    }));
    expect(result.cart).toEqual(expectedCart);
  });
  it('should decrease count in the "cart" with "decreaseQuantity" action', () => {
    const fakeFirstCartItem = makeFakeCartCamera();
    const initialState = {
      cart: [fakeFirstCartItem],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const expectedCart = [{...fakeFirstCartItem}];
    expectedCart[0].count --;
    const result = cartProcess.reducer(initialState, decreaseQuantity({
      id: fakeFirstCartItem.id
    }));
    expect(result.cart).toEqual(expectedCart);
  });
  it('should change count in the "cart" with "changeQuantity" action', () => {
    const fakeFirstCartItem = makeFakeCartCamera();
    const initialState = {
      cart: [fakeFirstCartItem],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const expectedCart = [{...fakeFirstCartItem}];
    const fakeCount = 8;
    expectedCart[0].count = fakeCount;
    const result = cartProcess.reducer(initialState, changeQuantity({
      id: fakeFirstCartItem.id,
      count: fakeCount
    }));
    expect(result.cart).toEqual(expectedCart);
  });
  it('should clear "cart" and "promoCode" with "clearCart" action', () => {
    const fakeFirstCartItem = makeFakeCartCamera();
    const fakePromoCode = 'promo';
    const initialState = {
      cart: [fakeFirstCartItem],
      promoCode: fakePromoCode,
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(initialState, clearCart());
    expect(result.cart).toEqual([]);
    expect(result.promoCode).toBe('');
  });
  it('should clear "error" with "clearError" action', () => {
    const fakeError = 'error';
    const initialState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: fakeError
    };
    const result = cartProcess.reducer(initialState, clearError());
    expect(result.error).toBe('');
  });
  it('should change "promoCode" with "changePromo" action', () => {
    const fakePromo = 'promo';
    const initialState = {
      cart: [],
      promoCode: '',
      statusLoadingCheck: StatusLoading.None,
      discountByCoupon: 0,
      error: ''
    };
    const result = cartProcess.reducer(initialState, changePromo({
      promo: fakePromo
    }));
    expect(result.promoCode).toBe(
      fakePromo
    );
  });
});
