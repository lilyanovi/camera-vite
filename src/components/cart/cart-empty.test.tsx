import { render, screen } from '@testing-library/react';
import { SortDirection, SortOption, START_PAGE, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';
import CartEmpty from './cart-empty';

describe('Component: CartEmpty', () => {
  it('should render correctly', () => {
    const expectedText = 'Вы ещё ничего не добавляли ...';
    const { withStoreComponent } = withStore(<CartEmpty />, {
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

    expect(screen.getByRole('link', {name: 'Вернуться к покупкам'})).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
