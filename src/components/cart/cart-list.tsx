import { useAppSelector } from '../../hooks';
import { selectCart } from '../../store/cart-process/cart-process.selectors';
import CartItem from './cart-item';

function CartList (): JSX.Element {
  const cart = useAppSelector(selectCart);
  return (
    <ul className="basket__list">
      {cart.map((camera) => <CartItem key={camera.id} camera={camera}/>)}
    </ul>
  );
}

export default CartList;
