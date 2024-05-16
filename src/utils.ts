import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/review';
import { STEP_REVIEWS_SHOWN } from './const';

export const getFormatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM');

export const getSortByDateReviews = (reviews: TReviews) => Array.from(reviews).sort((reviewA: TReview, reviewB: TReview) => {
  const dateA = Date.parse(reviewA.createAt);
  const dateB = Date.parse(reviewB.createAt);
  return dateB - dateA;
});

export const getCurrentReviews = (sortReviews: TReviews, currentReviews?: TReviews) => {
  if(!currentReviews){
    console.log('work')
    return sortReviews.slice(0, STEP_REVIEWS_SHOWN);
  }
  return sortReviews.slice(0, currentReviews.length + STEP_REVIEWS_SHOWN);
};
