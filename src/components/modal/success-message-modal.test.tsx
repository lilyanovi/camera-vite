import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { StatusLoading } from '../../const';
import SuccessMessageModal from './success-message-modal';
import userEvent from '@testing-library/user-event';

describe('Component: SuccessMessageModal', () => {
  it('should render correctly when "isBasket"', () => {
    const expectedText = 'Спасибо за покупку';
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isBasket/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Вернуться к покупкам'})).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
  it('should render correctly when "isReview"', () => {
    const expectedText = 'Спасибо за отзыв';
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isReview/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Вернуться к покупкам'})).toBeInTheDocument();
  });
  it('should render correctly when "isReview" and user enter button', async () => {
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isReview/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(
      screen.getByRole('button')
    );

    expect(mockOnButtonClick).toBeCalledTimes(1);
  });
  it('should render correctly when "isCard"', () => {
    const expectedText = 'Товар успешно добавлен в корзину';
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isCard/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Продолжить покупки'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Перейти в корзину'})).toBeInTheDocument();
  });
  it('should render correctly when "isCard"  and user enter link', async () => {
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isCard/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.click(
      screen.getByRole('link', {name: 'Продолжить покупки'})
    );

    expect(mockOnButtonClick).toBeCalledTimes(1);
  });
  it('should render correctly when "isProduct"', () => {
    const expectedText = 'Товар успешно добавлен в корзину';
    const mockOnButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<SuccessMessageModal onButtonClick={mockOnButtonClick} isProduct/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: 'Продолжить покупки'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Перейти в корзину'})).toBeInTheDocument();
  });
});
