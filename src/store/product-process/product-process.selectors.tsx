import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const selectCurrentProduct = (state: State) => state[NameSpace.Product].currentProduct;

const selectStatusLoading = (state: State) => state[NameSpace.Product].statusLoading;

export {selectCurrentProduct, selectStatusLoading};
