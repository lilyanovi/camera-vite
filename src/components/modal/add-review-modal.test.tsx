import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import { StatusLoading } from '../../const';
import { makeFakeIdNumber } from '../../mocks';
import AddReviewModal from './add-review-modal';

describe('Component: AddReviewModal', () => {
  it('should render correctly', () => {
    const expectedText = 'Оставить отзыв';
    const mockOnButtonClick = vi.fn();
    const mockOnSuccessModalChange = vi.fn();
    const fakeCameraId = makeFakeIdNumber();
    const { withStoreComponent } = withStore(<AddReviewModal onButtonClick={mockOnButtonClick} cameraId={fakeCameraId} onSuccessModalChange={mockOnSuccessModalChange}/>, { ORDER: {statusLoading: StatusLoading.Success, error: ''} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByLabelText('Ваше имя')).toBeInTheDocument();
    expect(screen.getByLabelText('Комментарий')).toBeInTheDocument();
    expect(screen.getByLabelText('Недостатки')).toBeInTheDocument();
    expect(screen.getByLabelText('Достоинства')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Отправить отзыв'})).toBeInTheDocument();
  });
});
