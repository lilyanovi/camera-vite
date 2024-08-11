import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { StatusLoading } from '../../const';
import userEvent from '@testing-library/user-event';
import CartModal from './cart-modal';
import { makeFakeCamera } from '../../mocks';

describe('Component: CartModal', () => {
  it('should render correctly', () => {
    const mockOnButtonClick = vi.fn();
    const mockOnSuccessModalChange = vi.fn();
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CartModal onButtonClick={mockOnButtonClick} camera={fakeCamera} onSuccessModalChange={mockOnSuccessModalChange}/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''},
      CART: {cart: [],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Добавить в корзину'})).toBeInTheDocument();
  });
  it('should render correctly when user enter button', async () => {
    const mockOnButtonClick = vi.fn();
    const mockOnSuccessModalChange = vi.fn();
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CartModal onButtonClick={mockOnButtonClick} camera={fakeCamera} onSuccessModalChange={mockOnSuccessModalChange}/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''},
      CART: {cart: [],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(
      screen.getByRole('button')
    );

    expect(mockOnButtonClick).toBeCalledTimes(1);
  });
  it('should render correctly when "isRemove"', () => {
    const mockOnButtonClick = vi.fn();
    const mockOnSuccessModalChange = vi.fn();
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CartModal onButtonClick={mockOnButtonClick} camera={fakeCamera} onSuccessModalChange={mockOnSuccessModalChange} isRemove/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''},
      CART: {cart: [],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.vendorCode)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Удалить'})).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Продолжить покупки'})).toBeInTheDocument();
  });
  it('should render correctly when user enter link', async () => {
    const mockOnButtonClick = vi.fn();
    const mockOnSuccessModalChange = vi.fn();
    const fakeCamera = makeFakeCamera();
    const { withStoreComponent } = withStore(<CartModal onButtonClick={mockOnButtonClick} camera={fakeCamera} onSuccessModalChange={mockOnSuccessModalChange} isRemove/>, {
      ORDER: {statusLoading: StatusLoading.Success, error: ''},
      CART: {cart: [],
        promoCode: '',
        statusLoadingCheck: StatusLoading.None,
        discountByCoupon: 0,
        error: ''}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(
      screen.getByRole('link', {name: 'Продолжить покупки'})
    );

    expect(mockOnButtonClick).toBeCalledTimes(1);
  });
});
