import { NameSpace } from '../../const';
import type { State } from '../../types/state';

const selectSortReviews = (state: State) => state[NameSpace.Reviews].sortReviews;

const selectStatusLoading = (state: State) => state[NameSpace.Reviews].statusLoading;

export {selectSortReviews, selectStatusLoading};
