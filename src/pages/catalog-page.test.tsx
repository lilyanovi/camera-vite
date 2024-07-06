import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock-component';

import CatalogPage from './catalog-page';
import { makeFakeCamera, makeFakePromoProduct } from '../mocks';
import { START_PAGE, SortDirections, SortOption, StatusLoading } from '../const';

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const { withStoreComponent } = withStore(<CatalogPage/>, {CAMERAS: {
      cameras: [makeFakeCamera()],
      promoProducts: [makeFakePromoProduct()],
      statusLoading: StatusLoading.Success,
      sort: SortOption.sortPrice,
      direction: SortDirections.up,
      currentPage: START_PAGE,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      }}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
