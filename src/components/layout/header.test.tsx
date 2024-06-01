import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Header from './header';
import { Links } from '../../const';

describe('Component: Header', () => {
  it('should render correctly', () => {
    const expectedHeaderContainerTestId = 'header-container';
    const { withStoreComponent } = withStore(<Header/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedHeaderContainerTestId)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(Links.Navigation.length + 1);
  });
});
