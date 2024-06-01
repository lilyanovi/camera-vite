import { render, screen } from '@testing-library/react';
import Arrow from './arrow';

describe('Component: Arrow', () => {
  it('should render correctly', () => {
    const expectedArrowContainerTestId = 'arrow-container';

    render(<Arrow/>);

    expect(screen.getByTestId(expectedArrowContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
