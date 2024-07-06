import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import Filters from './filters';

describe('Component: Filters', () => {
  it('should render correctly', () => {
    const expectedText = 'Фильтр';
    const { withStoreComponent } = withStore(
      <Filters/>, {CAMERAS: {
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
        direction: SortDirections.up,
        currentPage: START_PAGE}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(2);
    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
  });
});
