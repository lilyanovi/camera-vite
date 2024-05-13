import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCamera } from '../types/camera';
import { APIRoute } from '../const';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';

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
