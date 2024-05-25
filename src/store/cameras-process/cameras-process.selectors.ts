import { NameSpace, StatusLoading } from '../../const';
import { TCamera, TPromoProduct } from '../../types/camera';
import type { State } from '../../types/state';

const selectCameras = (state: Pick<State, NameSpace.Cameras>): TCamera[] => state[NameSpace.Cameras].cameras;

const selectPromoProducts = (state: Pick<State, NameSpace.Cameras>): TPromoProduct[] => state[NameSpace.Cameras].promoProducts;

const selectStatusLoading = (state: Pick<State, NameSpace.Cameras>): StatusLoading => state[NameSpace.Cameras].statusLoading;

export {selectCameras, selectPromoProducts, selectStatusLoading};
