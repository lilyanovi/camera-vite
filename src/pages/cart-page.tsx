import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../const';
import Cart from '../components/cart/cart';

function CartPage (): JSX.Element {

  return (
    <main data-testid="cart-container">
      <Helmet>
        <title>Корзина</title>
      </Helmet>
      <div className="page-content">
        <div className="breadcrumbs">
          <div className="container">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Main}>Главная
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={AppRoute.Main}>Каталог
                  <svg width="5" height="8" aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini"></use>
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
              </li>
            </ul>
          </div>
        </div>
        <Cart />
      </div>
    </main>
  );
}

export default CartPage;
