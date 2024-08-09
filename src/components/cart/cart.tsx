import { useAppSelector } from '../../hooks';
import { selectCart } from '../../store/cart-process/cart-process.selectors';
import CartEmpty from './cart-empty';
import CartList from './cart-list';
import CartSummary from './cart-summary';

function Cart (): JSX.Element {
  const cart = useAppSelector(selectCart);
  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        {cart.length !== 0 ? <CartList /> : <CartEmpty />}
        <CartSummary />
      </div>
    </section>
  );
}

export default Cart;
