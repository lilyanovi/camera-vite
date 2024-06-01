import { render, screen } from '@testing-library/react';
import SocialItem from './social-item';

describe('Component: SocialItem', () => {
  it('should render correctly', () => {
    const fakeSocial = { name: 'name', label: 'label'};
    const expectedItemContainerTestId = 'social-item-container';

    render(<SocialItem social={fakeSocial}/>);

    expect(screen.getByTestId(expectedItemContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});

