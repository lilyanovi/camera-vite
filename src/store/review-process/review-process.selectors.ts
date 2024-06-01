import { NameSpace, StatusLoading } from '../../const';
import { TReviews } from '../../types/review';
import type { State } from '../../types/state';

const selectSortReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].sortReviews;

const selectStatusLoading = (state: Pick<State, NameSpace.Reviews>): StatusLoading => state[NameSpace.Reviews].statusLoading;

export {selectSortReviews, selectStatusLoading};
