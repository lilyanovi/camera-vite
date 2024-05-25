import { StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import { fetchCamerasListAction } from '../api-actions';
import { camerasProcess } from './cameras-process.slice';

describe('CamerasProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cameras: new Array(5).fill(null).map(() => makeFakeCamera()),
      promoProducts: new Array(4).fill(null).map(() => makeFakePromoProduct()),
      statusLoading: StatusLoading.Success,
    };
    const result = camerasProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
    };
    const result = camerasProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "fetchCamerasListAction.pending"', () => {
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "cameras" to array with "fetchCamerasListAction.fulfilled"', () => {
    const mockCameras = makeFakeCamera();
    const expectedState = {
      cameras: [mockCameras],
      promoProducts: [],
      statusLoading: StatusLoading.Success,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.fulfilled(
      [mockCameras], '', undefined
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "fetchCamerasListAction.rejected"', () => {
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Failed,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.rejected);
    expect(result).toEqual(expectedState);
  });
});
