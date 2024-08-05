import { NameSpace, StatusLoading } from '../../const';
import type { State } from '../../types/state';

const selectStatusLoadingPost = (state: Pick<State, NameSpace.Order>): StatusLoading => state[NameSpace.Order].statusLoading;

const selectError = (state: Pick<State, NameSpace.Order>): string => state[NameSpace.Order].error;

export {selectStatusLoadingPost, selectError};
