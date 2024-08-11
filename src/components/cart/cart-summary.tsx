import { StatusCodes } from 'http-status-codes';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postOrderPhoneAction } from '../../store/api-actions';
import { selectPromoProducts } from '../../store/cameras-process/cameras-process.selectors';
import { selectCart, selectDiscountByCoupon, selectPromo, selectStatusLoadingCheck } from '../../store/cart-process/cart-process.selectors';
import { getBonusPrice, getTotalPrice, getTotalPriceWithDiscount } from '../../utils';
import { clearCart } from '../../store/cart-process/cart-process.slice';
import { useState } from 'react';
import Modal from '../modal/modal';
import SuccessMessageModal from '../modal/success-message-modal';
import { AppRoute, StatusLoading } from '../../const';
import { useNavigate } from 'react-router-dom';
import { selectError, selectStatusLoadingPost } from '../../store/order-process/order-process.selectors';
import FailMessageModal from '../modal/fail-message-modal';
import { clearError } from '../../store/order-process/order-process.slice';
import PromoCode from '../promo-code/promo-code';

function CartSummary (): JSX.Element {
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);
  const [isErrorModalActive, setIsErrorModalActive] = useState(false);

  const cart = useAppSelector(selectCart);
  const promoCameras = useAppSelector(selectPromoProducts);
  const statusLoading = useAppSelector(selectStatusLoadingPost);
  const statusLoadingCheck = useAppSelector(selectStatusLoadingCheck);
  const error = useAppSelector(selectError);
  const coupon = useAppSelector(selectPromo);
  const discount = useAppSelector(selectDiscountByCoupon);

  const bonus = getBonusPrice(cart, promoCameras);
  const totalPrice = getTotalPrice(cart);
  const totalPriceWithDiscount = getTotalPriceWithDiscount(totalPrice, bonus, discount);
  const totalDiscount = (totalPriceWithDiscount - totalPrice).toFixed(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = statusLoading === StatusLoading.Loading || statusLoadingCheck === StatusLoading.Loading;

  const handleSuccessModalChange = () => {
    setIsSuccessModalActive(!isSuccessModalActive);

    if(isSuccessModalActive){
      navigate(AppRoute.Main);
    }
  };

  const handleFailModalChange = () => {
    setIsErrorModalActive(!isErrorModalActive);
    dispatch(clearError());
  };

  const handleButtonClick = () => {
    dispatch(postOrderPhoneAction({
      camerasIds: cart.map((camera) => camera.id),
      coupon: coupon
    })).then((response) => {
      if (response.payload === StatusCodes.CREATED){
        handleSuccessModalChange();
        dispatch(clearCart());
      }
      if(error){
        setIsErrorModalActive(!isErrorModalActive);
      }
    });
  };

  return (
    <div className="basket__summary">
      <PromoCode />
      <div className="basket__summary-order">
        <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{totalPrice} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className={`basket__summary-value${totalDiscount ? ' basket__summary-value--bonus' : ''}`}>{cart.length !== 0 ? totalDiscount : 0} ₽</span></p>
        <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{totalPriceWithDiscount} ₽</span></p>
        <button className="btn btn--purple" type="submit" disabled={cart.length === 0 || isLoading} onClick={handleButtonClick}>{ isLoading ? 'Оформление заказа...' : 'Оформить заказ'}
        </button>
      </div>
      {isSuccessModalActive ?
        <Modal
          content={<SuccessMessageModal onButtonClick={handleSuccessModalChange} isBasket/>}
          onButtonClick={handleSuccessModalChange}
        /> : ''}
      {isErrorModalActive ?
        <Modal
          content={<FailMessageModal />}
          onButtonClick={handleFailModalChange}
        /> : ''}
    </div>
  );
}

export default CartSummary;
