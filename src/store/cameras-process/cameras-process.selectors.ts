import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const selectCameras = (state: State) => state[NameSpace.Cameras].cameras;

const selectPromoProducts = (state: State) => state[NameSpace.Cameras].promoProducts;

const selectStatusLoading = (state: State) => state[NameSpace.Cameras].statusLoading;

export {selectCameras, selectPromoProducts, selectStatusLoading};
