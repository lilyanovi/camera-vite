import { NameSpace, StatusLoading } from '../../const';
import { makeFakeCamera } from '../../mocks';
import { selectCurrentProduct, selectSimilarProducts, selectStatusLoading } from './product-process.selectors';

describe('ProductProcess selectors', () => {
  const state = {
    [NameSpace.Product]: {
      currentProduct: makeFakeCamera(),
      statusLoading: StatusLoading.Loading,
      similarProducts: new Array(3).fill(null).map(() => makeFakeCamera()),
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Product];
    const result = selectStatusLoading(state);
    expect(result).toBe(statusLoading);
  });
  it('should return currentProduct from state', () => {
    const { currentProduct } = state[NameSpace.Product];
    const result = selectCurrentProduct(state);
    expect(result).toEqual(currentProduct);
  });
  it('should return similarProducts from state', () => {
    const { similarProducts } = state[NameSpace.Product];
    const result = selectSimilarProducts(state);
    expect(result).toEqual(similarProducts);
  });
});
