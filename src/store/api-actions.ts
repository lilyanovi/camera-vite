import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera, TPromoProduct } from '../types/camera';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { TReviews } from '../types/review';
import { TOrder } from '../types/order';

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

export const postOrderPhoneAction = createAsyncThunk<TCamera, TOrder, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}
>(
  'data/postOrder/phone',
  async (order, {extra: api}) => {
    const response = await api.post<TCamera>(APIRoute.Order, order);
    return response.data;
  }
);
