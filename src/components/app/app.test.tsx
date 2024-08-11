import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import App from './app';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct, makeFakeReview, makeFakeStore } from '../../mocks';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;
  let withHistoryApp: React.ReactElement;

  beforeAll(() => {
    mockHistory = createMemoryHistory();
  });

  beforeEach(() => {
    withHistoryApp = withHistory(<App />, mockHistory);
  });

  describe('Route "/"', () => {
    it('should render "CatalogPage" when user navigate to "/"', () => {
      const {withStoreComponent} = withStore(
        withHistoryApp,
        makeFakeStore(
          {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings: {
            price: null,
            priceUp: null,
            level: [],
            category: null,
            type: [],
          }}}
        )
      );
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    });
  });

  describe('Route "/product/:id"', () => {
    it('should render "ProductPage" when when user navigate to "/product/:id"', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeFakeStore({
          REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success, error: ''},
          CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings: {
            price: null,
            priceUp: null,
            level: [],
            category: null,
            type: [],
          }},
          PRODUCT: {currentProduct: makeFakeCamera(), similarProducts: [makeFakeCamera()], statusLoading: StatusLoading.Success}
        })
      );
      const expectedProductPageContainerTestId = 'product-page-container';
      mockHistory.push(`${AppRoute.Product}/:id`);

      render(withStoreComponent);

      expect(screen.getByTestId(expectedProductPageContainerTestId)).toBeInTheDocument();
    });
  });

  describe('Route "*"', () => {
    it('should render "NotFoundPage" when user navigate to non-existent route', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const { withStoreComponent } = withStore(
        withHistoryComponent,
        makeFakeStore({
          REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success, error: ''},
          CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings: {
            price: null,
            priceUp: null,
            level: [],
            category: null,
            type: [],
          }},
          PRODUCT: {currentProduct: makeFakeCamera(), similarProducts: [makeFakeCamera()], statusLoading: StatusLoading.Success}
        }));
      const unknownRoute = '/unknown-route';
      mockHistory.push(unknownRoute);

      render(withStoreComponent);

      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
      expect(screen.getByText('Go to home page')).toBeInTheDocument();
    });
  });

  describe('Route "/card"', () => {
    it('should render "CartPage" when user navigate to "/card"', () => {
      const expectedTestIdContainer = 'cart-container';
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeFakeStore(
          {CART: {cart: [], promoCode: '', statusLoadingCheck: StatusLoading.Success, discountByCoupon: 0, error: ''}}
        )
      );
      mockHistory.push(AppRoute.Cart);

      render(withStoreComponent);

      expect(screen.getByTestId(expectedTestIdContainer)).toBeInTheDocument();
    });
  });

});


