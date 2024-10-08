import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Layout from './layout';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';
import { START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';


describe('Component: Layout', () => {
  it('should render correctly', () => {
    const expectedLayoutContainerTestId = 'layout-container';
    const expectedHeaderContainerTestId = 'header-container';
    const expectedText = 'Интернет-магазин фото- и видеотехники';
    const { withStoreComponent } = withStore(<Layout/>,
      {CAMERAS: {
        cameras: [makeFakeCamera()],
        promoProducts:[makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        filteredSettings:  {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        },
        sort: SortOption.sortPrice,
        direction: SortDirection.up,
        currentPage: START_PAGE
      },
      CART: {cart: [makeFakeCartCamera()],
        promoCode: '',
        statusLoadingCheck: StatusLoading.Success,
        discountByCoupon: 0,
        error: ''},
      ORDER: {
        statusLoading: StatusLoading.None,
        error: ''
      },
      REVIEWS: {
        statusLoading: StatusLoading.None,
        error: '',
        sortReviews: []
      }
      });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedLayoutContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedHeaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});


