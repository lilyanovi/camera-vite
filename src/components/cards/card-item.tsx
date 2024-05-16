import { Link } from 'react-router-dom';
import { TCamera } from '../../types/camera';
import Rating from '../rating/rating';
import { AppRoute } from '../../const';

type CardItemProps = {
  camera: TCamera;
}

function CardItem ({camera}: CardItemProps): JSX.Element {
  const {id, name, previewImg, price, previewImgWebp, previewImgWebp2x, previewImg2x, rating, reviewCount} = camera;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`}/><img src={previewImg} srcSet={`${previewImg2x} 2x`} width="280" height="240" alt={name}/>
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
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
