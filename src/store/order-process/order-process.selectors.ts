import { NameSpace, StatusLoading } from '../../const';
import type { State } from '../../types/state';

const selectStatusLoading = (state: Pick<State, NameSpace.Order>): StatusLoading => state[NameSpace.Order].statusLoading;

export {selectStatusLoading};
