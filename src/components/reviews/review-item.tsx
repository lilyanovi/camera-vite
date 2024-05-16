import { TReview } from '../../types/review';
import { getFormatDate } from '../../utils';
import Rating from '../rating/rating';

type ReviewItemProps = {
  review: TReview;
}

function ReviewItem ({review}: ReviewItemProps): JSX.Element {

  const {createAt, userName, advantage, disadvantage, review: reviewText, rating} = review;
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{getFormatDate(createAt)}</time>
      </div>
      <div className="rate review-card__rate">
        <Rating rating={rating} />
        <p className="visually-hidden">Оценка: {rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{reviewText}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
