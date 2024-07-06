import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import Cards from './cards';

describe('Component: Cards', () => {
  it('should render correctly', () => {
    const expectedCardsContainerTestId = 'cards-container';
    const expectedCardItemContainerTestId = 'product-card-container';
    const expectedCount = 5;
    const { withStoreComponent } = withStore(<Cards/>, {CAMERAS: {
      cameras: new Array(expectedCount).fill(null).map(() => makeFakeCamera()),
      currentPage: START_PAGE,
      promoProducts: [makeFakePromoProduct()],
      statusLoading: StatusLoading.Success,
      sort: SortOption.sortPrice,
      direction: SortDirections.up,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      }}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedCardsContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(expectedCardItemContainerTestId)).toHaveLength(expectedCount);
  });
});
