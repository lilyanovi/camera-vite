import { Link } from 'react-router-dom';
import { TCamera } from '../../types/camera';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';
import Modal from '../modal/modal';
import CallModal from '../modal/call-modal';
import { useEffect, useState } from 'react';

type CardItemProps = {
  camera: TCamera;
  isActive?: boolean;
}

function CardItem ({camera, isActive}: CardItemProps): JSX.Element {
  const {id, name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, rating, reviewCount} = camera;
  const [isModalActive, setIsModalActive] = useState(false);

  const handleButtonClick = () => {
    setIsModalActive(!isModalActive);
  };

  useEffect(() => {
    if(isModalActive){
      document.body.classList.add('scroll-lock');
    } else {
      document.body.classList.remove('scroll-lock');
    }
  }, [isModalActive]);

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
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleButtonClick}
        >Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
      {isModalActive ?
        <Modal
          content={<CallModal camera={camera} handleButtonClick={handleButtonClick}/>}
          handleButtonClick={handleButtonClick}
        /> : ''}
    </div>
  );
}

export default CardItem;
