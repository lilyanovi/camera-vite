import { StatusLoading } from '../../const';
import { makeFakeCamera, makeFakeId } from '../../mocks';
import { fetchProductByIdAction, fetchSimilarProductsByIdAction } from '../api-actions';
import { productProcess } from './product-process.slice';

describe('ProductProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      similarProducts: new Array(5).fill(null).map(() => makeFakeCamera()),
      currentProduct: makeFakeCamera(),
      statusLoading: StatusLoading.Success,
    };
    const result = productProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      currentProduct: null,
      statusLoading: StatusLoading.Loading,
      similarProducts: []
    };
    const result = productProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "fetchProductByIdAction.pending"', () => {
    const expectedState = {
      currentProduct: null,
      statusLoading: StatusLoading.Loading,
      similarProducts: []
    };
    const result = productProcess.reducer(undefined, fetchProductByIdAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "currentProduct" to object with "fetchProductByIdAction.fulfilled"', () => {
    const mockCurrentProduct = makeFakeCamera();
    const mockId = makeFakeId();
    const expectedState = {
      currentProduct: mockCurrentProduct,
      statusLoading: StatusLoading.Success,
      similarProducts: []
    };
    const result = productProcess.reducer(undefined, fetchProductByIdAction.fulfilled(
      mockCurrentProduct, '', mockId
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "fetchProductByIdAction.rejected"', () => {
    const expectedState = {
      currentProduct: null,
      statusLoading: StatusLoading.Failed,
      similarProducts: []
    };
    const result = productProcess.reducer(undefined, fetchProductByIdAction.rejected);
    expect(result).toEqual(expectedState);
  });
  it('should set "similarProducts" to array with "fetchSimilarProductsByIdAction.fulfilled"', () => {
    const mockSimilarProduct = makeFakeCamera();
    const mockId = makeFakeId();
    const expectedState = {
      currentProduct: null,
      statusLoading: StatusLoading.Loading,
      similarProducts: [mockSimilarProduct]
    };
    const result = productProcess.reducer(undefined, fetchSimilarProductsByIdAction.fulfilled(
      [mockSimilarProduct], '', mockId
    ));
    expect(result).toEqual(expectedState);
  });
});
