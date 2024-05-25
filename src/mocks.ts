import faker, {name, date, image, lorem, datatype, commerce, random} from 'faker';
import { TCamera, TPromoProduct } from './types/camera';
import { Categories, Levels, Types } from './const';
import { TReview } from './types/review';

faker.locale = 'ru';

export const makeFakeDate = (): string => String(date.past());

export const makeFakeCamera = (): TCamera => ({
  id: datatype.number(),
  name: lorem.sentence(3),
  vendorCode: datatype.uuid(),
  type: random.objectElement(Types) as Types,
  category: random.objectElement(Categories) as Categories,
  description: commerce.productDescription(),
  level: random.objectElement(Levels) as Levels,
  price: Number(commerce.price()),
  rating: datatype.number(5),
  reviewCount: datatype.number(1000),
  previewImg: image.technics(),
  previewImg2x: image.technics(),
  previewImgWebp: image.technics(),
  previewImgWebp2x: image.technics(),
}) as TCamera;

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

export const makeFakeId = (): string => String(datatype.number());


