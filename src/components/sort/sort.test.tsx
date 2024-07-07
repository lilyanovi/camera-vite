import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import Sort from './sort';

describe('Component: Sort', () => {
  it('should render correctly', () => {
    const expectedText = 'Сортировать:';
    const { withStoreComponent } = withStore(
      <Sort/>, {CAMERAS: {
        cameras: [makeFakeCamera()],
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
        direction: SortDirection.up,
        currentPage: START_PAGE}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(4);
  });
});
