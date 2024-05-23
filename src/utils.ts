import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/review';
import { SLIDER_PRODUCTS_COUNT, STEP_REVIEWS_SHOWN, Types } from './const';
import { TCamera } from './types/camera';

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

export const getPhoneByPost = (phone: string) => phone.replace(/[^0-9]/ig, ''). replace(/^[78]/, '+7');

export const getIsActiveProducts = (products: TCamera[], isActiveProducts?: number[], isPrev?: boolean) => {

  if(!isActiveProducts){
    return products.slice(0, SLIDER_PRODUCTS_COUNT).map((product) => product.id);
  }
  if(isPrev){
    const firstIndex = products.findIndex((product) => product.id === isActiveProducts.at(0));
    if(firstIndex < 3) {
      return products.slice(0, SLIDER_PRODUCTS_COUNT).map((product) => product.id);
    }
    return products.slice(firstIndex - SLIDER_PRODUCTS_COUNT, firstIndex).map((product) => product.id);
  }
  const lastIndex = products.findIndex((product) => product.id === isActiveProducts.at(-1));
  return products.slice(lastIndex + 1, lastIndex + 1 + SLIDER_PRODUCTS_COUNT).map((product) => product.id);
};
