import { StatusLoading } from '../const';
import { TReviews } from './review';

export type ReviewProcess = {
  sortReviews: TReviews;
  statusLoading: StatusLoading;
  error: string;
};
