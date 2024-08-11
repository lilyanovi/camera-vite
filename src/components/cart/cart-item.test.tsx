import { render, screen } from '@testing-library/react';
import { SortDirection, SortOption, START_PAGE, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';
import CartItem from './cart-item';

describe('Component: CartItem', () => {
  it('should render correctly', () => {
    const expectedText = 'Общая цена:';
    const fakeCamera = makeFakeCartCamera();
    const { withStoreComponent } = withStore(<CartItem camera={fakeCamera} />, {
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

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
  });
});
