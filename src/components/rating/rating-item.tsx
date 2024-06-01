type RatingItemProps = {
  rating: number;
  currentRate: number;
}

function RatingItem ({rating, currentRate}: RatingItemProps): JSX.Element {
  return (
    <svg width="17" height="16" aria-hidden="true" data-testid="rating-item-container">
      <use xlinkHref={`#icon${rating >= currentRate ? '-full' : ''}-star`}></use>
    </svg>
  );
}

export default RatingItem;
