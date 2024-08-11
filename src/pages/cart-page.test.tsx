import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock-component';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../mocks';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../const';
import CartPage from './cart-page';

describe('Component: CartPage', () => {
  it('should render correctly', () => {
    const expectedContainerTestId = 'cart-container';
    const { withStoreComponent } = withStore(<CartPage/>, {
      CAMERAS: {
        cameras: [makeFakeCamera()],
        promoProducts: [makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        sort: SortOption.sortPrice,
        direction: SortDirection.up,
        currentPage: START_PAGE,
        filteredSettings: {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        }},
      CART: {cart: [makeFakeCartCamera()],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''},
      ORDER: {
        statusLoading: StatusLoading.None,
        error: ''
      }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Главная'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Каталог'})).toBeInTheDocument();
  });
});
