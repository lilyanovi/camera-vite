import { useAppSelector } from '../../hooks';
import { selectSortedCameras } from '../../store/cameras-process/cameras-process.selectors';
import CardItem from './card-item';
import EmptyCards from './empty-cards';

function Cards (): JSX.Element {
  const sortedCameras = useAppSelector(selectSortedCameras);

  return (
    <div className="cards catalog__cards" data-testid="cards-container">
      {sortedCameras.length !== 0 ? sortedCameras.map((camera) => <CardItem key={camera.id} camera={camera}/>) : <EmptyCards />}
    </div>
  );
}

export default Cards;
