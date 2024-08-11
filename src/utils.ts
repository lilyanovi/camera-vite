import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import type { TReview, TReviews } from './types/review';
import { Category, Level, SLIDER_PRODUCTS_COUNT, STEP_REVIEWS_SHOWN, SortDirection, SortOption, Type } from './const';
import type { TCamera, TCartCamera, TPromoProduct } from './types/camera';

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

export const getTypeForPhoto = (type: Type) => {
  switch(type){
    case Type.Collection:
    case Type.Film:
    case Type.Snapshot:
      return `${type.slice(0, -2)}ый`;
    case Type.Digital:
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

export const getSortCamerasList = (sort: SortOption, cameras: TCamera[], direction: SortDirection) => {
  switch(sort) {
    case SortOption.sortPrice:
      if(direction === SortDirection.up){
        return cameras.slice().sort((cameraA, cameraB) => cameraA.price - cameraB.price);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.price - cameraA.price);
    case SortOption.sortPopular:
      if(direction === SortDirection.up){
        return cameras.slice().sort((cameraA, cameraB) => cameraA.rating - cameraB.rating);
      }
      return cameras.slice().sort((cameraA, cameraB) => cameraB.rating - cameraA.rating);
    default:
      return cameras;
  }
};

const getFilteredCamerasListByPrice = (cameras: TCamera[], price: number) => cameras.filter((camera) => camera.price >= price);

const getFilteredCamerasListByPriceUp = (cameras: TCamera[], priceUp: number) => cameras.filter((camera) => camera.price <= priceUp);

const getFilteredCamerasListByLevel = (cameras: TCamera[], levels: Level[]) => cameras.filter((camera) => levels.includes(camera.level));

const getFilteredCamerasListByType = (cameras: TCamera[], types: Type[]) => cameras.filter((camera) => types.includes(camera.type));

const getFilteredCamerasListByCategory = (cameras: TCamera[], category: Category) => cameras.filter((camera) => camera.category === category);


export const getFilteredCamerasList = (cameras: TCamera[], price: number | null, priceUp: number | null, category: Category | null, type: Type[], level: Level[]) => {
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
  category?: Category | null;
  type?: Type[];
  level?: Level[];
};

export const getQueryObject = (settings: settingsType, sort: SortOption, direction: SortDirection, page: number) => {
  const result: {
    price?: string;
    priceUp?: string;
    category?: Category;
    type?: string;
    level?: string;
    sort?: string;
    direction?: string;
    page?: string;
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
  if(page){
    result.page = String(page);
  }
  return result;
};

export const getMinMaxPrice = (cameras: TCamera[]) => {
  if(cameras.length !== 0) {
    const sortCameras = getSortCamerasList(SortOption.sortPrice, cameras, SortDirection.up);
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

export const getCartCount = (cart: TCartCamera[]) => cart.reduce(((acc, cur) => acc + cur.count), 0);

export const getProductPrice = (price: number, count: number) => price * count;

export const getTotalPrice = (cart: TCartCamera[]) => cart.reduce(((acc, cur) => acc + getProductPrice(cur.price, cur.count)), 0);

const getBonus = (cart: TCartCamera[], promo: TPromoProduct[]) => {
  let bonus = 0;
  const promoIds = promo.map((camera) => camera.id);
  const cartWithoutPromo = cart.filter((camera) => !promoIds.includes(camera.id));
  const cartCount = getCartCount(cartWithoutPromo);

  if(cartCount < 2){
    return bonus;
  } else if(cartCount === 2){
    bonus = 3;
  } else if (cartCount > 2 && cartCount < 6){
    bonus = 5;
  } else if (cartCount >= 6 && cartCount <= 10){
    bonus = 10;
  } else if (cartCount > 10){
    bonus = 15;
  }

  const totalPrice = getTotalPrice(cartWithoutPromo);
  if(totalPrice < 10000){
    return bonus;
  } else if(totalPrice >= 10000 && totalPrice < 20000){
    bonus = bonus - 1;
  } else if(totalPrice >= 20000 && totalPrice < 30000){
    bonus = bonus - 2;
  } else if(totalPrice >= 30000){
    bonus = bonus - 3;
  }
  return bonus;
};

export const getBonusPrice = (cart: TCartCamera[], promo: TPromoProduct[]): number => {
  const bonus = getBonus(cart, promo);
  if(bonus > 0){
    const promoIds = promo.map((camera) => camera.id);
    return Number(cart.reduce(((acc, camera) => !promoIds.includes(camera.id) ? (acc + getProductPrice(camera.price, camera.count) * (bonus / 100)) : acc), 0).toFixed(1));
  } else {
    return 0;
  }
};

export const getTotalPriceWithDiscount = (totalPrice: number, bonus: number, discount: number) => {
  let result = totalPrice - Number(bonus);
  if(discount){
    result = Number(((result * (100 - discount)) / 100).toFixed(1));
  }
  return result;
};

