import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const selectCurrentProduct = (state: State) => state[NameSpace.Product].currentProduct;

const selectSimilarProducts = (state: State) => state[NameSpace.Product].similarProducts;

const selectStatusLoading = (state: State) => state[NameSpace.Product].statusLoading;

export {selectCurrentProduct, selectSimilarProducts, selectStatusLoading};
