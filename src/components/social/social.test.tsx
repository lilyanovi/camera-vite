import { render, screen } from '@testing-library/react';
import Social from './social';
import { Socials } from '../../const';

describe('Component: Social', () => {
  it('should render correctly', () => {
    const expectedSocialContainerTestId = 'social-container';
    const expectedItemContainerTestId = 'social-item-container';

    render(<Social />);

    expect(screen.getByTestId(expectedSocialContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(expectedItemContainerTestId)).toHaveLength(Socials.length)
  });
});

