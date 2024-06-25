import { Link } from 'react-router-dom';
import { TCamera } from '../../types/camera';
import { AppRoute } from '../../const';

type SearchItemProps = {
  camera: TCamera;
};

function SearchItem ({camera}: SearchItemProps): JSX.Element {

  return (
    <li className="form-search__select-item" tabIndex={0} ><Link to={`${AppRoute.Product}/${camera.id}`}>{camera.name}</Link></li>
  );
}

export default SearchItem;
