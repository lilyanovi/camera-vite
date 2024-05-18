import { Categories, Levels, Types } from '../const';

export type TCamera = {
  id: number;
  name: string;
  vendorCode: string;
  type: Types;
  category: Categories;
  description: string;
  level: Levels;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};
