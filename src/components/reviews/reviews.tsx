import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectError, selectSortReviews } from '../../store/review-process/review-process.selectors';
import { getCurrentReviews } from '../../utils';
import ReviewItem from './review-item';
import type { TReviews } from '../../types/review';
import EmptyReviews from './empty-reviews';
import Modal from '../modal/modal';
import AddReviewModal from '../modal/add-review-modal';
import SuccessMessageModal from '../modal/success-message-modal';
import { clearError } from '../../store/review-process/review-process.slice';
import { toast } from 'react-toastify';

type ReviewsProps = {
  id: number;
}

function Reviews ({id}: ReviewsProps): JSX.Element {
  const [isReviewModalActive, setIsReviewModalActive] = useState(false);
  const [isSuccessReviewModalActive, setIsSuccessReviewModalActive] = useState(false);

  const sortReviews = useAppSelector(selectSortReviews);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();

  const [currentReviews, setCurrentReviews] = useState<TReviews>([]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(sortReviews.length > 0){
        setCurrentReviews(getCurrentReviews(sortReviews));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [sortReviews]);

  const handleButtonClick = useCallback(() => {
    if(window.scrollY >= document.documentElement.scrollHeight - window.innerHeight) {
      if(sortReviews > currentReviews){
        setCurrentReviews(getCurrentReviews(sortReviews, currentReviews));
      }
    }
  }, [currentReviews, sortReviews]);

  const handleSuccessReviewModalChange = () => {
    setIsSuccessReviewModalActive(!isSuccessReviewModalActive);
  };

  const handleReviewModalChange = () => {
    setIsReviewModalActive(!isReviewModalActive);
  };

  useEffect(() => {
    if(error){
      toast.warn(error, {
        position: 'bottom-right'
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    document.addEventListener('scroll', handleButtonClick);

    return function () {
      document.removeEventListener('scroll', handleButtonClick);
    };
  }, [handleButtonClick]);

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button
            className="btn"
            type="button"
            onClick={handleReviewModalChange}
          >Оставить свой отзыв
          </button>
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
      {isReviewModalActive ?
        <Modal
          content={<AddReviewModal cameraId={id} onButtonClick={handleReviewModalChange} onSuccessModalChange={handleSuccessReviewModalChange}/>}
          onButtonClick={handleReviewModalChange}
        /> : ''}
      {isSuccessReviewModalActive ?
        <Modal
          content={<SuccessMessageModal onButtonClick={handleSuccessReviewModalChange} isReview/>}
          onButtonClick={handleSuccessReviewModalChange}
        /> : ''}
    </section>
  );
}

export default Reviews;
