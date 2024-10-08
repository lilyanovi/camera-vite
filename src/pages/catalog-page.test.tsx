import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock-component';

import CatalogPage from './catalog-page';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../mocks';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../const';

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const { withStoreComponent } = withStore(<CatalogPage/>, {
      CAMERAS: {
        cameras: [makeFakeCamera()],
        promoProducts: [makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        sort: SortOption.sortPrice,
        direction: SortDirection.up,
        currentPage: START_PAGE,
        filteredSettings: {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        }},
      CART: {cart: [makeFakeCartCamera()],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
