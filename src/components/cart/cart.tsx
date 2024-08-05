import CartList from './cart-list';
import CartSummary from './cart-summary';

function Cart (): JSX.Element {
  return (
    <section className="basket">
      <div className="container">
        <h1 className="title title--h2">Корзина</h1>
        <CartList />
        <CartSummary />
      </div>
    </section>
  );
}

export default Cart;
