import { useAppSelector } from '../../hooks';
import { selectCurrentCamerasList } from '../../store/cameras-process/cameras-process.selectors';
import CardItem from './card-item';
import EmptyCards from './empty-cards';

function Cards (): JSX.Element {
  const currentCamerasList = useAppSelector(selectCurrentCamerasList);

  return (
    <div className="cards catalog__cards" data-testid="cards-container">
      {currentCamerasList.length !== 0 ? currentCamerasList.map((camera) => <CardItem key={camera.id} camera={camera}/>) : <EmptyCards />}
    </div>
  );
}

export default Cards;
