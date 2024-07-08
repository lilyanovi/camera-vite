import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import SearchItem from './search-item';


describe('Component: SearchItem', () => {
  it('should render correctly', () => {
    const fakeFilteredCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(
      <SearchItem camera={fakeFilteredCamera}/>, {CAMERAS: {
        cameras: new Array(4).fill(null).map(() => makeFakeCamera()),
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

    expect(screen.getByText(fakeFilteredCamera.name)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
