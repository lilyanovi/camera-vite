import { RatingItems } from '../../const';
import RatingItem from './rating-item';

type RatingProps = {
  rating: number;
}

function Rating ({rating}: RatingProps): JSX.Element {
  return (
    <>
      {RatingItems.map((rate) => <RatingItem rating={rating} currentRate={rate} key={rate}/>)}
    </>
  );
}

export default Rating;
