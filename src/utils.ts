import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/review';
import { STEP_REVIEWS_SHOWN, Types } from './const';

export const getFormatDate = (date: string) => dayjs(date).locale('ru').format('DD MMMM');

export const getSortByDateReviews = (reviews: TReviews) => Array.from(reviews).sort((reviewA: TReview, reviewB: TReview) => {
  const dateA = Date.parse(reviewA.createAt);
  const dateB = Date.parse(reviewB.createAt);
  return dateB - dateA;
});

export const getCurrentReviews = (sortReviews: TReviews, currentReviews?: TReviews) => {
  if(!currentReviews){
    return sortReviews.slice(0, STEP_REVIEWS_SHOWN);
  }
  return sortReviews.slice(0, currentReviews.length + STEP_REVIEWS_SHOWN);
};

export const getTypeForPhoto = (type: Types) => {
  switch(type){
    case Types.Collectible:
    case Types.Film:
    case Types.Instant:
      return `${type.slice(0, -2)}ый`;
    case Types.Digital:
      return `${type.slice(0, -2)}ой`;
  }
};
