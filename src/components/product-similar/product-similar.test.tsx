import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import ProductSimilar from './product-similar';
import { makeFakeCamera } from '../../mocks';
import { StatusLoading } from '../../const';

describe('Component: ProductSimilar', () => {
  it('should render correctly', () => {
    const expectedText = 'Похожие товары';
    const { withStoreComponent } = withStore(<ProductSimilar />, {PRODUCT: {similarProducts: [makeFakeCamera()], currentProduct: makeFakeCamera(), statusLoading: StatusLoading.Success}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3);
  });
});
