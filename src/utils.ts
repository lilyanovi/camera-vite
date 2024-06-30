import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { TReview, TReviews } from './types/review';
import { Categories, Levels, SLIDER_PRODUCTS_COUNT, STEP_REVIEWS_SHOWN, SortDirections, SortOption, Types } from './const';
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
    case Types.Collection:
    case Types.Film:
    case Types.Snapshot:
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

export const getFilteredCameras = (cameras: TCamera[], value: string) => cameras.filter((camera) => camera.name.toLowerCase().includes(value.toLowerCase()));

export const getSortCamerasList = (sort: SortOption, cameras: TCamera[], direction: SortDirections) => {
  switch(sort) {
    case SortOption.sortPrice:
      if(direction === SortDirections.up){
        return cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.price - cameraA.price);
    case SortOption.sortPopular:
      if(direction === SortDirections.up){
        return cameras.slice().sort((cameraA, cameraB) => cameraA.rating - cameraB.rating);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.rating - cameraA.rating);
    default:
      return cameras;
  }
};

const getFilteredCamerasListByPrice = (cameras: TCamera[], price: number) => cameras.filter((camera) => camera.price >= price);

const getFilteredCamerasListByPriceUp = (cameras: TCamera[], priceUp: number) => cameras.filter((camera) => camera.price <= priceUp);

const getFilteredCamerasListByLevel = (cameras: TCamera[], levels: Levels[]) => cameras.filter((camera) => levels.includes(camera.level));

const getFilteredCamerasListByType = (cameras: TCamera[], types: Types[]) => cameras.filter((camera) => types.includes(camera.type));

const getFilteredCamerasListByCategory = (cameras: TCamera[], category: Categories) => cameras.filter((camera) => camera.category === category);


export const getFilteredCamerasList = (cameras: TCamera[], price: number | null, priceUp: number | null, category: Categories | null, type: Types[], level: Levels[]) => {
  let result = cameras.slice();
  if(price){
    result = getFilteredCamerasListByPrice(result, price);
  }
  if(priceUp){
    result = getFilteredCamerasListByPriceUp(result, priceUp);
  }
  if(category){
    result = getFilteredCamerasListByCategory(result, category);
  }
  if(type.length !== 0){
    result = getFilteredCamerasListByType(result, type);
  }
  if(level.length !== 0){
    result = getFilteredCamerasListByLevel(result, level);
  }
  return result;
};

type settingsType = {
  price?: number | null;
  priceUp?: number | null;
  category?: Categories | null;
  type?: Types[];
  level?: Levels[];
};

export const getQueryObject = (settings: settingsType, sort: SortOption, direction: SortDirections) => {
  const result: {
    price?: string;
    priceUp?: string;
    category?: Categories;
    type?: string;
    level?: string;
    sort?: string;
    direction?: string;
  } = {};
  if(settings.price){
    result.price = String(settings.price);
  }
  if(settings.priceUp){
    result.priceUp = String(settings.priceUp);
  }
  if(settings.category){
    result.category = settings.category;
  }
  if(settings.type && settings.type.length !== 0){
    result.type = settings.type?.join('+');
  }
  if(settings.level && settings.level.length !== 0){
    result.level = settings.level?.join('+');
  }
  if(sort){
    result.sort = sort;
  }
  if(direction){
    result.direction = direction;
  }
  return result;
};

export const getMinMaxPrice = (cameras: TCamera[]) => {
  if(cameras.length !== 0) {
    const sortCameras = getSortCamerasList(SortOption.sortPrice, cameras, SortDirections.up);
    const lastIndex = sortCameras.length - 1;
    return {
      min: String(sortCameras[0].price),
      max: String(sortCameras[lastIndex].price)
    };
  }
  return {
    min: 'от',
    max: 'до'
  };
};
