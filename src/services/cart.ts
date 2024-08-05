import { TCartCamera } from '../types/camera';

const CART_KEY_NAME = 'cart';
const PROMO_CODE = 'promo';

export const saveCart = (cart: TCartCamera[]): void => {
  localStorage.setItem(CART_KEY_NAME, JSON.stringify(cart));
};

export const savePromo = (promo: string): void => {
  localStorage.setItem(PROMO_CODE, promo);
};

export const dropCart = (): void => {
  localStorage.removeItem(CART_KEY_NAME);
  localStorage.removeItem(PROMO_CODE);
};

export const getCart = (): TCartCamera[] => {
  const cart = localStorage.getItem(CART_KEY_NAME);
  return cart ? JSON.parse(cart) as TCartCamera[] : [];
};

export const getPromo = (): string => {
  const promo = localStorage.getItem(PROMO_CODE);
  return promo ? promo : '';
};
