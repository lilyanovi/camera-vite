import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { camerasProcess } from './cameras-process/cameras-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: camerasProcess.reducer,
});
