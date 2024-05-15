import { StatusLoading } from '../const';
import { TReviews } from './review';

export type ReviewProcess = {
  currentReviews: TReviews | null;
  statusLoading: StatusLoading;
};
