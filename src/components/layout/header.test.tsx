import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Header from './header';
import { Links, START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakeCartCamera, makeFakePromoProduct } from '../../mocks';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedHeaderContainerTestId = 'header-container';
    const { withStoreComponent } = withStore(<Header/>, {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings:  {
      price: null,
      priceUp: null,
      level: [],
      category: null,
      type: [],
    }},
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
    }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedHeaderContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(Links.Navigation.length + 2);
  });

  it('should render "Loader" when cameras is loading', () => {
    const expectedLoaderContainerTestId = 'loader-container';
    const { withStoreComponent } = withStore(<Header/>, {CAMERAS: {cameras: [], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Loading, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings:  {
      price: null,
      priceUp: null,
      level: [],
      category: null,
      type: [],
    }},
    CART: {cart: [makeFakeCartCamera()],
      promoCode: '',
      statusLoadingCheck: StatusLoading.Loading,
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
    }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedLoaderContainerTestId)).toBeInTheDocument();
  });

});
