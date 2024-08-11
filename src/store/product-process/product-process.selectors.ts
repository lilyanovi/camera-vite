import { NameSpace, StatusLoading } from '../../const';
import type { TCamera } from '../../types/camera';
import type { State } from '../../types/state';

const selectCurrentProduct = (state: Pick<State, NameSpace.Product>): TCamera | null => state[NameSpace.Product].currentProduct;

const selectSimilarProducts = (state: Pick<State, NameSpace.Product>): TCamera[] => state[NameSpace.Product].similarProducts;

const selectStatusLoading = (state: Pick<State, NameSpace.Product>): StatusLoading => state[NameSpace.Product].statusLoading;

export {selectCurrentProduct, selectSimilarProducts, selectStatusLoading};
