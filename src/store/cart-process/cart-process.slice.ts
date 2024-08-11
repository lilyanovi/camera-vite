import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, StatusLoading } from '../../const';
import type { CartProcess } from '../../types/cart-process';
import type { TCartCamera } from '../../types/camera';
import { dropCart, saveCart, savePromo } from '../../services/cart';
import { checkCouponAction } from '../api-actions';

const initialState: CartProcess = {
  cart: [],
  promoCode: '',
  statusLoadingCheck: StatusLoading.None,
  discountByCoupon: 0,
  error: ''
};

export const cartProcess = createSlice({
  name: NameSpace.Cart,
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{cartItem: TCartCamera} >) => {
      state.cart.push(action.payload.cartItem);
      saveCart(state.cart);
    },
    removeToCart: (state, action: PayloadAction<{id: number} >) => {
      state.cart = state.cart.filter((camera) => camera.id !== action.payload.id);
      saveCart(state.cart);
    },
    increaseQuantity: (state, action: PayloadAction<{id: number} >) => {
      const index = state.cart.findIndex((camera) => camera.id === action.payload.id);
      state.cart[index].count ++;
      saveCart(state.cart);
    },
    decreaseQuantity: (state, action: PayloadAction<{id: number} >) => {
      const index = state.cart.findIndex((camera) => camera.id === action.payload.id);
      state.cart[index].count --;
      saveCart(state.cart);
    },
    changeQuantity: (state, action: PayloadAction<{id: number; count: number} >) => {
      const index = state.cart.findIndex((camera) => camera.id === action.payload.id);
      state.cart[index].count = action.payload.count;
      saveCart(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      state.promoCode = '';
      dropCart();
    },
    loadCart: (state, action: PayloadAction<{cart: TCartCamera[]} >) => {
      state.cart = action.payload.cart;
    },
    changePromo: (state, action: PayloadAction<{promo: string} >) => {
      state.promoCode = action.payload.promo;
    },
    clearError: (state) => {
      state.error = '';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkCouponAction.pending, (state) => {
        state.statusLoadingCheck = StatusLoading.Loading;
      })
      .addCase(checkCouponAction.fulfilled, (state, action) => {
        state.statusLoadingCheck = StatusLoading.Success;
        state.promoCode = action.meta.arg;
        state.discountByCoupon = Number(action.payload);
        savePromo(state.promoCode);
      })
      .addCase(checkCouponAction.rejected, (state, action) => {
        state.statusLoadingCheck = StatusLoading.Failed;
        state.error = action.error.message ?? '';
      });
  }
});

export const {addToCart, removeToCart, increaseQuantity, decreaseQuantity, changeQuantity, clearCart, loadCart, changePromo, clearError} = cartProcess.actions;

