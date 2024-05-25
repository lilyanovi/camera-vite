import { NameSpace, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import { selectCameras, selectPromoProducts, selectStatusLoading } from './cameras-process.selectors';

describe('CamerasProcess selectors', () => {
  const state = {
    [NameSpace.Cameras]: {
      cameras: new Array(8).fill(null).map(() => makeFakeCamera()),
      promoProducts: new Array(4).fill(null).map(() => makeFakePromoProduct()),
      statusLoading: StatusLoading.Success,
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Cameras];
    const result = selectStatusLoading(state);
    expect(result).toBe(statusLoading);
  });
  it('should return cameras from state', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = selectCameras(state);
    expect(result).toEqual(cameras);
  });
  it('should return promoProducts from state', () => {
    const { promoProducts } = state[NameSpace.Cameras];
    const result = selectPromoProducts(state);
    expect(result).toEqual(promoProducts);
  });
});
