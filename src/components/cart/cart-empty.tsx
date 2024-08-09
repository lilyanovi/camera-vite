import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function CartEmpty (): JSX.Element {
  return (
    <div className="container">
      <h1 className="title title--h3">Вы ещё ничего не добавляли ...</h1>
      <Link to={AppRoute.Main} className="btn btn--transparent modal__btn">Вернуться к покупкам</Link>
    </div>
  );
}

export default CartEmpty;
