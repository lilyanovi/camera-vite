import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const selectStatusLoading = (state: State) => state[NameSpace.Order].statusLoading;

export {selectStatusLoading};
