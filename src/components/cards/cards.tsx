import { useAppSelector } from '../../hooks';
import { selectFilteredCameras } from '../../store/cameras-process/cameras-process.selectors';
import CardItem from './card-item';
import EmptyCards from './empty-cards';

function Cards (): JSX.Element {
  const filteredCameras = useAppSelector(selectFilteredCameras);

  return (
    <div className="cards catalog__cards" data-testid="cards-container">
      {filteredCameras.length !== 0 ? filteredCameras.map((camera) => <CardItem key={camera.id} camera={camera}/>) : <EmptyCards />}
    </div>
  );
}

export default Cards;
