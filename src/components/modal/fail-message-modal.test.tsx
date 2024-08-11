import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import FailMessageModal from './fail-message-modal';
import { StatusLoading } from '../../const';

describe('Component: FailMessageModal', () => {
  it('should render correctly', () => {
    const expectedModalContainerTestId = 'fail-container';
    const { withStoreComponent } = withStore(<FailMessageModal />,
      {ORDER: {
        statusLoading: StatusLoading.None,
        error: ''
      }});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedModalContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Вернуться к покупкам'})).toBeInTheDocument();
  });
});
