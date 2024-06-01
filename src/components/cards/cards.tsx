import { useAppSelector } from '../../hooks';
import { selectCameras } from '../../store/cameras-process/cameras-process.selectors';
import CardItem from './card-item';
import EmptyCards from './empty-cards';

function Cards (): JSX.Element {
  const cameras = useAppSelector(selectCameras);

  return (
    <div className="cards catalog__cards" data-testid="cards-container">
      {cameras.length !== 0 ? cameras.map((camera) => <CardItem key={camera.id} camera={camera}/>) : <EmptyCards />}
    </div>
  );
}

export default Cards;
