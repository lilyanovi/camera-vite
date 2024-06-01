import { render, screen } from '@testing-library/react';
import Loader from './loader';

describe('Component: Loader', () => {
  it('should render correctly', () => {
    const expectedLoaderContainerTestId = 'loader-container';

    render(<Loader/>);

    expect(screen.getByTestId(expectedLoaderContainerTestId)).toBeInTheDocument();
  });
});
