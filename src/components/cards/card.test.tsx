import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';
import Cards from './cards';

describe('Component: Cards', () => {
  it('should render correctly', () => {
    const expectedCardsContainerTestId = 'cards-container';
    const expectedCardItemContainerTestId = 'product-card-container';
    const expectedCount = 5;
    const { withStoreComponent } = withStore(<Cards/>, {
      CAMERAS: {
        cameras: new Array(expectedCount).fill(null).map(() => makeFakeCamera()),
        currentPage: START_PAGE,
        promoProducts: [makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        sort: SortOption.sortPrice,
        direction: SortDirection.up,
        filteredSettings: {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        }},
      CART: {cart: [makeFakeCartCamera()],
        promoCode: '',
        statusLoadingCheck: StatusLoading.Success,
        discountByCoupon: 0,
        error: ''}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedCardsContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(expectedCardItemContainerTestId)).toHaveLength(expectedCount);
  });
});
