import faker, {name, date, image, lorem, datatype, commerce, random} from 'faker';
import type { TCamera, TCartCamera, TPromoProduct } from './types/camera';
import { Category, Level, SortDirection, SortOption, START_PAGE, StatusLoading, Type } from './const';
import type { TReview, TReviewByPost, TReviewByServer } from './types/review';
import { createAPI } from './services/api';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import type { TOrder } from './types/order';
import type { State } from './types/state';

faker.locale = 'ru';

export const makeFakeDate = (): string => String(date.past());

export const makeFakeCamera = (): TCamera => ({
  id: datatype.number(),
  name: lorem.sentence(3),
  vendorCode: datatype.uuid(),
  type: random.objectElement(Type) as Type,
  category: random.objectElement(Category) as Category,
  description: commerce.productDescription(),
  level: random.objectElement(Level) as Level,
  price: Number(commerce.price()),
  rating: datatype.number(5),
  reviewCount: datatype.number(1000),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
}) as TCamera;

export const makeFakeCartCamera = (): TCartCamera => ({
  id: datatype.number(),
  name: lorem.sentence(3),
  vendorCode: datatype.uuid(),
  type: random.objectElement(Type) as Type,
  category: random.objectElement(Category) as Category,
  description: commerce.productDescription(),
  level: random.objectElement(Level) as Level,
  price: Number(commerce.price()),
  rating: datatype.number(5),
  reviewCount: datatype.number(1000),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
  count: datatype.number(5),
}) as TCartCamera;

export const makeFakePromoProduct = (): TPromoProduct => ({
  id: datatype.number(),
  name: lorem.sentence(3),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
}) as TPromoProduct;

export const makeFakeReview = (): TReview => ({
  id: datatype.uuid(),
  createAt: makeFakeDate(),
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(3),
  disadvantage: lorem.sentence(3),
  review: commerce.productDescription(),
  rating: datatype.number(5),
}) as TReview;

export const makeFakeReviewByPost = (): TReviewByPost => ({
  cameraId: datatype.number(),
  userName: name.firstName(),
  advantage: lorem.sentence(3),
  disadvantage: lorem.sentence(3),
  review: commerce.productDescription(),
  rating: datatype.number(5),
}) as TReviewByPost;

export const makeFakeOrder = (): TOrder => ({
  camerasIds: [datatype.number(5)],
  coupon: lorem.sentence(1)
}) as TOrder;

export const makeFakeReviewByServer = (): TReviewByServer => ({
  id: datatype.uuid(),
  createAt: makeFakeDate(),
}) as TReviewByServer;

export const makeFakeIdNumber = (): number => Number(datatype.number());

export const makeFakeId = (): string => String(makeFakeIdNumber());

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>

export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({type}) => type);

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  CAMERAS: { cameras: [],
    promoProducts: [],
    statusLoading: StatusLoading.Loading,
    filteredSettings: {
      price: null,
      priceUp: null,
      level: [],
      category: null,
      type: [],
    },
    sort: SortOption.sortPrice,
    direction: SortDirection.up,
    currentPage: START_PAGE},
  PRODUCT: { currentProduct: null, similarProducts: [], statusLoading: StatusLoading.Loading },
  REVIEWS: { sortReviews: [], statusLoading: StatusLoading.Loading, error: '' },
  ORDER: { statusLoading: StatusLoading.Success, error: '' },
  CART: {cart: [],
    promoCode: '',
    statusLoadingCheck: StatusLoading.None,
    discountByCoupon: 0,
    error: ''},
  ...initialState ?? {},
});
