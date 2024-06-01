import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../mock-component';
import CallModal from './call-modal';
import { makeFakeCamera } from '../../mocks';
import { StatusLoading } from '../../const';

describe('Component: CallModal', () => {
  it('should render correctly', () => {
    const expectedText = 'Свяжитесь со мной';
    const phoneText = 'Телефон';
    const placeholderText = 'Введите ваш номер';
    const fakeCamera = makeFakeCamera();
    const mockHandleButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<CallModal camera={fakeCamera} handleButtonClick={mockHandleButtonClick}/>, { ORDER: {statusLoading: StatusLoading.Success} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByText(phoneText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render correctly when user enter phone', async () => {
    const phoneElementTestId = 'phoneElement';
    const expectedPhoneValue = '+72223334455';
    const fakeCamera = makeFakeCamera();
    const mockHandleButtonClick = vi.fn();
    const { withStoreComponent } = withStore(<CallModal camera={fakeCamera} handleButtonClick={mockHandleButtonClick}/>, { ORDER: {statusLoading: StatusLoading.Success} });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByTestId(phoneElementTestId),
      expectedPhoneValue,
    );

    expect(screen.getByDisplayValue(expectedPhoneValue)).toBeInTheDocument();
  });

});
