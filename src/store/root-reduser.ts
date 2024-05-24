import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasProcess } from './cameras-process/cameras-process.slice';
import { productProcess } from './product-process/product-process.slice';
import { reviewProcess } from './review-process/review-process.slice';
import { orderProcess } from './order-process/order-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasProcess.reducer,
  [NameSpace.Product]: productProcess.reducer,
  [NameSpace.Reviews]: reviewProcess.reducer,
  [NameSpace.Order]: orderProcess.reducer,
});
