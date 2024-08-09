import { Link } from 'react-router-dom';
import { TCamera } from '../../types/camera';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';
import { useEffect, useState } from 'react';
import CartModal from '../modal/cart-modal';
import { useAppSelector } from '../../hooks';
import { selectCart } from '../../store/cart-process/cart-process.selectors';
import SuccessMessageModal from '../modal/success-message-modal';

type CardItemProps = {
  camera: TCamera;
  isActive?: boolean;
}

function CardItem ({camera, isActive}: CardItemProps): JSX.Element {
  const {id, name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, rating, reviewCount} = camera;
  const [isModalActive, setIsModalActive] = useState(false);
  const [isSuccessModalActive, setIsSuccessModalActive] = useState(false);

  const handleButtonClick = () => {
    setIsModalActive(!isModalActive);
  };

  const handleSuccessModalChange = () => {
    setIsSuccessModalActive(!isSuccessModalActive);
  };

  useEffect(() => {
    if(isModalActive){
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isModalActive]);

  const cart = useAppSelector(selectCart);

  const isCartCamera = cart.find((cameraItem) => cameraItem.id === id);

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`} data-testid="product-card-container">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, /${previewImgWebp2x} 2x`}/><img src={`/${previewImg}`} srcSet={`/${previewImg2x} 2x`} width="280" height="240" alt={name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <Rating rating={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isCartCamera ?
          <Link className="btn btn--purple-border" to={AppRoute.Cart}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleButtonClick}
          >Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
      {isModalActive ?
        <Modal
          content={<CartModal camera={camera} handleButtonClick={handleButtonClick} handleSuccessModalChange={handleSuccessModalChange}/>}
          handleButtonClick={handleButtonClick}
        /> : ''}
      {isSuccessModalActive ?
        <Modal
          content={<SuccessMessageModal handleButtonClick={handleSuccessModalChange} isCard/>}
          handleButtonClick={handleSuccessModalChange}
        /> : ''}
    </div>
  );
}

export default CardItem;
