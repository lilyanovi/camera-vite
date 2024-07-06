import { render, screen } from '@testing-library/react';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import SearchList from './search-list';

describe('Component: SearchList', () => {
  it('should render correctly', () => {
    const expectedListContainerTestId = 'search-list-container';
    const fakeFilteredCameras = [makeFakeCamera()];
    const { withStoreComponent } = withStore(
      <SearchList filteredCameras={fakeFilteredCameras}/>, {CAMERAS: {
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
        direction: SortDirections.up,
        currentPage: START_PAGE}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedListContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(1);
  });
});
