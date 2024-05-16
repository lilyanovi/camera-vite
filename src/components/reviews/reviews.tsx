import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { selectSortReviews } from '../../store/review-process/review-process.selectors';
import { getCurrentReviews } from '../../utils';
import ReviewItem from './review-item';
import { TReviews } from '../../types/review';
import EmptyReviews from './empty-reviews';

function Reviews (): JSX.Element {
  const sortReviews = useAppSelector(selectSortReviews);

  const [currentReviews, setCurrentReviews] = useState<TReviews>([]);

  useEffect(() => {
    if(sortReviews.length > 0){
      setCurrentReviews(getCurrentReviews(sortReviews));
    }
  }, [sortReviews]);

  const handleButtonClick = () => {
    if(sortReviews > currentReviews){
      setCurrentReviews(getCurrentReviews(sortReviews, currentReviews));
    }
  };

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
        </div>
        <ul className="review-block__list">
          {currentReviews.length > 0 ? currentReviews.map((review) => <ReviewItem key={review.id} review={review}/>) : <EmptyReviews />}
        </ul>
        <div className="review-block__buttons">
          {sortReviews > currentReviews ?
            <button
              className="btn btn--purple"
              type="button"
              onClick={handleButtonClick}
            >Показать больше отзывов
            </button> : ''}
        </div>
      </div>
    </section>
  );
}

export default Reviews;