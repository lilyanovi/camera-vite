import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock-component';
import { makeFakeCamera, makeFakeReview } from '../mocks';
import { StatusLoading } from '../const';
import ProductPage from './product-page';

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    const fakeCamera = makeFakeCamera();
    const fakeSimilarProducts = [makeFakeCamera()];
    const firstExpectedText = 'Похожие товары';
    const secondExpectedText = 'Отзывы';
    const expectedArrowContainerTestId = 'arrow-container';
    const { withStoreComponent } = withStore(<ProductPage/>, {
      PRODUCT: {similarProducts: fakeSimilarProducts, currentProduct: fakeCamera, statusLoading: StatusLoading.Success},
      REVIEWS: {sortReviews: [makeFakeReview()], statusLoading: StatusLoading.Success}
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByText(fakeCamera.name)).toHaveLength(2);
    expect(screen.getByRole('button', {name: 'Добавить в корзину'})).toBeInTheDocument();
    expect(screen.getAllByText(firstExpectedText)).toHaveLength(fakeSimilarProducts.length);
    expect(screen.getByText(secondExpectedText)).toBeInTheDocument();
    expect(screen.getByTestId(expectedArrowContainerTestId)).toBeInTheDocument();
  });

});

