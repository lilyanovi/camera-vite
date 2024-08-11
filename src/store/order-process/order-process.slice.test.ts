import { StatusLoading } from '../../const';
import { makeFakeOrder } from '../../mocks';
import { postOrderPhoneAction } from '../api-actions';
import { orderProcess } from './order-process.slice';

describe('OrderProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      statusLoading: StatusLoading.Success,
      error: '',
    };
    const result = orderProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      statusLoading: StatusLoading.None,
      error: '',
    };
    const result = orderProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "postOrderPhoneAction.pending"', () => {
    const expectedState = {
      statusLoading: StatusLoading.Loading,
      error: '',
    };
    const result = orderProcess.reducer(undefined, postOrderPhoneAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success" with "postOrderPhoneAction.fulfilled"', () => {
    const expectedState = {
      statusLoading: StatusLoading.Success,
      error: '',
    };
    const result = orderProcess.reducer(undefined, postOrderPhoneAction.fulfilled);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "postOrderPhoneAction.rejected"', () => {
    const fakeError = 'error message' as unknown as Error;
    const mockOrderByPost = makeFakeOrder();
    const expectedState = {
      statusLoading: StatusLoading.Failed,
      error: fakeError,
    };
    const result = orderProcess.reducer(undefined, postOrderPhoneAction.rejected(
      fakeError, '', mockOrderByPost
    ));
    expect(result).toEqual(expectedState);
  });
});
