import { useNavigate } from 'react-router-dom';
import { AppRoute, Category } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCart } from '../../store/cart-process/cart-process.selectors';
import { addToCart, increaseQuantity, removeToCart } from '../../store/cart-process/cart-process.slice';
import type { TCamera } from '../../types/camera';
import { getTypeForPhoto } from '../../utils';

type CartModalProps = {
  isRemove?: boolean;
  camera: TCamera;
  onButtonClick: () => void;
  onSuccessModalChange?: () => void;
}

function CartModal ({isRemove, camera, onButtonClick, onSuccessModalChange}: CartModalProps): JSX.Element {
  const {id, name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, vendorCode, type, category, level} = camera;
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCartButtonClick = () => {
    const isExist = cart.find((cameraItem) => cameraItem.id === id);
    if(isExist){
      dispatch(increaseQuantity({id: id}));
    } else {
      dispatch(addToCart({
        cartItem: {...camera, count: 1}
      }));
    }
    onButtonClick();
    if (onSuccessModalChange){
      onSuccessModalChange();
    }
  };

  const handleRemoveToCartButtonClick = () => {
    dispatch(removeToCart({
      id: id
    }));
    if(cart.length === 1){
      navigate(AppRoute.Main);
    }
    onButtonClick();
  };

  return (
    <>
      <p className="title title--h4">{isRemove ? 'Удалить этот товар?' : 'Добавить товар в корзину'}</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/><img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="140" height="120" alt={name}/>
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
          {isRemove ? '' : <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>}
        </div>
      </div>
      <div className="modal__buttons">
        {isRemove ?
          <>
            <button className="btn btn--purple modal__btn modal__btn--half-width" type="button" onClick={handleRemoveToCartButtonClick}>Удалить
            </button>
            <a className="btn btn--transparent modal__btn modal__btn--half-width" href="#" onClick={onButtonClick}>Продолжить покупки
            </a>
          </> :
          <button className="btn btn--purple modal__btn modal__btn--fit-width" type="button" onClick={handleAddToCartButtonClick}>
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>}
      </div>
    </>
  );
}

export default CartModal;
