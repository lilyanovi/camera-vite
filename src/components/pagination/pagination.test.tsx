import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import Pagination from './pagination';

describe('Component: Pagination', () => {
  it('should render correctly', () => {
    const expectedPaginationContainerTestId = 'pagination-container';
    const expectedPaginationItemContainerTestId = 'pagination-item-container';
    const { withStoreComponent } = withStore(
      <Pagination/>, {CAMERAS: {
        cameras: new Array(10).fill(null).map(() => makeFakeCamera()),
        promoProducts: [makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        filteredSettings: {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        },
        sort: SortOption.sortPrice,
        direction: SortDirections.up,
        currentPage: START_PAGE}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedPaginationContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(expectedPaginationItemContainerTestId)).toHaveLength(2);
  });
});
