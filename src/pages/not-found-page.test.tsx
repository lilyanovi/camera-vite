import { render, screen } from '@testing-library/react';
import NotFoundPage from './not-found-page';
import { withHistory } from '../mock-component';

describe('Component: NotFoundPage', () => {
  it('should render correctly', () => {
    const expectedText = '404 Not Found';
    const expectedLinkTest = 'Go to home page';
    const preparedComponent = withHistory(<NotFoundPage />);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: expectedLinkTest})).toBeInTheDocument();
  });
});
