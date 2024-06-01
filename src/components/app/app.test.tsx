import { render, screen} from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import { AppRoute, StatusLoading } from '../../const';
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
    it('should render "Loader" when cameras is loading', () => {
      const {withStoreComponent} = withStore(
        withHistoryApp,
        makeFakeStore(
          {CAMERAS: {cameras: [], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Loading}}
        )
      );
      const expectedLoaderContainerTestId = 'loader-container';
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.getByTestId(expectedLoaderContainerTestId)).toBeInTheDocument();
    });

    it('should render "CatalogPage" when user navigate to "/"', () => {
      const {withStoreComponent} = withStore(
        withHistoryApp,
        makeFakeStore(
          {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success}}
        )
      );
      mockHistory.push(AppRoute.Main);

      render(withStoreComponent);

      expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    });
  });

  describe('Route "/product/:id"', () => {
    it('should render "Loader" when data for product do not loading', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeFakeStore({
          REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success},
          CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success}
        })
      );
      const expectedLoaderContainerTestId = 'loader-container';
      mockHistory.push(`${AppRoute.Product}/:id`);

      render(withStoreComponent);

      expect(screen.getByTestId(expectedLoaderContainerTestId)).toBeInTheDocument();
    });

    it('should render "ProductPage" when when user navigate to "/product/:id"', () => {
      const withHistoryComponent = withHistory(<App />, mockHistory);
      const {withStoreComponent} = withStore(
        withHistoryComponent,
        makeFakeStore({
          REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success},
          CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success},
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
          REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success},
          CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success},
          PRODUCT: {currentProduct: makeFakeCamera(), similarProducts: [makeFakeCamera()], statusLoading: StatusLoading.Success}
        }));
      const unknownRoute = '/unknown-route';
      mockHistory.push(unknownRoute);

      render(withStoreComponent);

      expect(screen.getByText('404 Not Found')).toBeInTheDocument();
      expect(screen.getByText('Go to home page')).toBeInTheDocument();
    });
  });

});
