import { createAsyncThunk } from '@reduxjs/toolkit';
import type { TCamera, TPromoProduct } from '../types/camera';
import { APIRoute } from '../const';
import type { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import type { TReview, TReviewByPost, TReviews } from '../types/review';
import type { TOrder } from '../types/order';

export const fetchCamerasListAction = createAsyncThunk<TCamera[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchCamera/all',
  async (_arg, {extra: api}) => {
    const response = await api.get<TCamera[]>(APIRoute.Camera);
    return response.data;
  }
);

export const fetchPromoProductsListAction = createAsyncThunk<TPromoProduct[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchPromoProducts',
  async (_arg, {extra: api}) => {
    const response = await api.get<TPromoProduct[]>(APIRoute.Promo);
    return response.data;
  }
);

export const fetchReviewsListAction = createAsyncThunk<TReviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchCamera/id/reviews',
  async (id, {extra: api}) => {
    const response = await api.get<TReviews>(`${APIRoute.Camera}/${id}/reviews`);
    return response.data;
  }
);

export const fetchProductByIdAction = createAsyncThunk<TCamera, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchCamera/id',
  async (id, {extra: api}) => {
    const response = await api.get<TCamera>(`${APIRoute.Camera}/${id}`);
    return response.data;
  }
);

export const fetchSimilarProductsByIdAction = createAsyncThunk<TCamera[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/fetchSimilarProducts/id',
  async (id, {extra: api}) => {
    const response = await api.get<TCamera[]>(`${APIRoute.Camera}/${id}/similar`);
    return response.data;
  }
);

export const postOrderPhoneAction = createAsyncThunk<unknown, TOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/postOrder/phone',
  async (order, {extra: api}) => {
    const response = await api.post(APIRoute.Order, order);
    return response.data;
  }
);

export const checkCouponAction = createAsyncThunk<unknown, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/checkCoupon',
  async (coupon, {extra: api}) => {
    const response = await api.post(APIRoute.Coupons, {coupon: coupon});
    return response.data;
  }
);

export const postReviewAction = createAsyncThunk<TReview, TReviewByPost, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/postReview',
  async (review, {extra: api}) => {
    const response = await api.post<TReview>(APIRoute.Reviews, review);
    return response.data;
  }
);
