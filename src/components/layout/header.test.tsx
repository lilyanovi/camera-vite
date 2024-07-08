import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Header from './header';
import { Links, START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedHeaderContainerTestId = 'header-container';
    const { withStoreComponent } = withStore(<Header/>, {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings:  {
      price: null,
      priceUp: null,
      level: [],
      category: null,
      type: [],
    }}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedHeaderContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(Links.Navigation.length + 1);
  });
});
