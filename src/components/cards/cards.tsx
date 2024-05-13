import { useAppSelector } from '../../hooks';
import { selectCameras } from '../../store/cameras-process/cameras-process.selectors';
import CardItem from './card-item';

function Cards (): JSX.Element {
  const cameras = useAppSelector(selectCameras);

  return (
    <div className="cards catalog__cards">
      {cameras.map((camera) => <CardItem key={camera.id} camera={camera}/>)}
    </div>
  );
}

export default Cards;
