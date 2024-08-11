import { NameSpace, StatusLoading } from '../../const';
import type { TReviews } from '../../types/review';
import type { State } from '../../types/state';

const selectSortReviews = (state: Pick<State, NameSpace.Reviews>): TReviews => state[NameSpace.Reviews].sortReviews;

const selectStatusLoadingReview = (state: Pick<State, NameSpace.Reviews>): StatusLoading => state[NameSpace.Reviews].statusLoading;

const selectError = (state: Pick<State, NameSpace.Reviews>): string => state[NameSpace.Reviews].error;

export {selectSortReviews, selectStatusLoadingReview, selectError};
