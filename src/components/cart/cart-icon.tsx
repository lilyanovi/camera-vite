import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectCart } from '../../store/cart-process/cart-process.selectors';
import { getCartCount } from '../../utils';
import { useEffect } from 'react';
import { getCart } from '../../services/cart';
import { loadCart } from '../../store/cart-process/cart-process.slice';

function CartIcon (): JSX.Element {

  const cart = useAppSelector(selectCart);

  const cartCount = getCartCount(cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      const localCart = getCart();
      if (localCart.length > 0){
        dispatch(loadCart({
          cart: localCart
        }));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <Link className="header__basket-link" to={AppRoute.Cart} data-testid="cart-icon-container">
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>
      {cartCount ? <span className="header__basket-count">{cartCount}</span> : ''}
    </Link>
  );
}

export default CartIcon;
