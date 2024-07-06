import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import Search from './search';


describe('Component: Search', () => {
  it('should render correctly', () => {
    const expectedText = 'Поиск по сайту';
    const { withStoreComponent } = withStore(
      <Search />, {CAMERAS: {
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

    expect(screen.getByPlaceholderText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
