import { render, screen } from '@testing-library/react';
import { SortDirection, SortOption, START_PAGE, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';
import CartIcon from './cart-icon';

describe('Component: CartIcon', () => {
  it('should render correctly', () => {
    const expectedTestId = 'cart-icon-container';
    const { withStoreComponent } = withStore(<CartIcon />, {
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
      CART: {
        cart: [makeFakeCartCamera()],
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

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
