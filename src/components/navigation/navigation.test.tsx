import { render, screen } from '@testing-library/react';
import Navigation from './navigation';
import { Links } from '../../const';
import { withHistory } from '../../mock-component';


describe('Component: Navigation', () => {
  it('should render correctly', () => {
    const expectedNavigationContainerTestId = 'navigate-container';
    const expectedItemContainerTestId = 'navigation-item-container';
    const preparedComponent = withHistory(<Navigation links={Links.Navigation}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedNavigationContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByTestId(expectedItemContainerTestId)).toHaveLength(Links.Navigation.length);
  });
});
