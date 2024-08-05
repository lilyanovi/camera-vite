import { ChangeEvent, useState } from 'react';
import { Category, QuantityCount, StatusLoading } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeQuantity, decreaseQuantity, increaseQuantity } from '../../store/cart-process/cart-process.slice';
import { TCartCamera } from '../../types/camera';
import { getProductPrice, getTypeForPhoto } from '../../utils';
import CartModal from '../modal/cart-modal';
import Modal from '../modal/modal';
import { selectStatusLoadingPost } from '../../store/order-process/order-process.selectors';
import { selectStatusLoadingCheck } from '../../store/cart-process/cart-process.selectors';

type CartItemProps = {
  camera: TCartCamera;
}

function CartItem ({camera}: CartItemProps): JSX.Element {
  const { id, name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, level, category, type, vendorCode, count} = camera;

  const [isModalActive, setIsModalActive] = useState(false);
  const statusLoadingCheck = useAppSelector(selectStatusLoadingCheck);
  const statusLoadingPost = useAppSelector(selectStatusLoadingPost);

  const isLoading = statusLoadingPost === StatusLoading.Loading || statusLoadingCheck === StatusLoading.Loading;

  const handleButtonClick = () => {
    setIsModalActive(!isModalActive);
  };

  const dispatch = useAppDispatch();

  const handleIncreaseClick = () => {
    dispatch(increaseQuantity({id: id}));
  };

  const handleDecreaseClick = () => {
    dispatch(decreaseQuantity({id: id}));
  };

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeQuantity({
      id: id,
      count: Number(evt.target.value)
    }));
  };

  return (
    <li className="basket-item">
      <div className="basket-item__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/><img src={previewImg} srcSet={`${previewImg2x} 2x`} width="140" height="120" alt={name}/>
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{category === Category.Videocamera ? type : getTypeForPhoto(type)} {category.toLowerCase()}</li>
          <li className="basket-item__list-item">{level} уровень</li>
        </ul>
      </div>
      <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      <div className="quantity">
        <button className="btn-icon btn-icon--prev" aria-label="уменьшить количество товара" onClick={handleDecreaseClick} disabled={count === QuantityCount.Min || isLoading}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input type="number" id="counter1" value={count} min="1" max="9" aria-label="количество товара" onChange={handleInputChange}/>
        <button className="btn-icon btn-icon--next" aria-label="увеличить количество товара" onClick={handleIncreaseClick} disabled={count === QuantityCount.Max || isLoading}>
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price"><span className="visually-hidden">Общая цена:</span>{getProductPrice(price, count)} ₽</div>
      <button className="cross-btn" type="button" aria-label="Удалить товар" onClick={handleButtonClick} disabled={isLoading}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
      {isModalActive ?
        <Modal
          content={<CartModal camera={camera} handleButtonClick={handleButtonClick} isRemove/>}
          handleButtonClick={handleButtonClick}
        /> : ''}

    </li>
  );
}

export default CartItem;
