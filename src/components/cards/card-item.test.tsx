import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import CardItem from './card-item';

describe('Component: CardItem', () => {
  it('should render correctly when missing "isActive"', () => {
    const expectedCardContainerTestId = 'product-card-container';
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CardItem camera={fakeCamera}/>, {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedCardContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId(expectedCardContainerTestId)).not.toHaveClass('is-active');
  });

  it('should render correctly when "isActive"', () => {
    const expectedCardContainerTestId = 'product-card-container';
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CardItem camera={fakeCamera} isActive/>, {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedCardContainerTestId)).toHaveClass('is-active');
  });
});
