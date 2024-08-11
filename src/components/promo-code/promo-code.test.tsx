import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakeCartCamera } from '../../mocks';
import { StatusLoading } from '../../const';
import PromoCode from './promo-code';

describe('Component: PromoCode', () => {
  it('should render correctly', () => {
    const expectedText = 'Промокод';
    const { withStoreComponent } = withStore(<PromoCode />, {
      PRODUCT: {similarProducts: [makeFakeCamera()], currentProduct: makeFakeCamera(), statusLoading: StatusLoading.Success},
      CART: {cart: [makeFakeCartCamera()],
        promoCode: '',
        statusLoadingCheck: StatusLoading.Success,
        discountByCoupon: 0,
        error: ''},
      ORDER: {
        error: '',
        statusLoading: StatusLoading.None
      }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(1);
  });
});
