import { withHistory } from '../../mock-component';
import { render, screen } from '@testing-library/react';
import NavigationItem from './navigation-item';

describe('Component: NavigationItem', () => {
  it('should render correctly', () => {
    const expectedItemContainerTestId = 'navigation-item-container';
    const fakeLink = {name: 'Гарантии', link: '#'};
    const preparedComponent = withHistory(<NavigationItem navigationItem={fakeLink}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedItemContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(fakeLink.name)).toBeInTheDocument();
  });

  it('should render correctly when "isFooter"', () => {
    const expectedItemContainerTestId = 'navigation-item-container';
    const fakeLink = {name: 'Гарантии', link: '#'};
    const preparedComponent = withHistory(<NavigationItem navigationItem={fakeLink} isFooter/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedItemContainerTestId)).toHaveClass('footer__item');
    expect(screen.getByTestId(expectedItemContainerTestId)).not.toHaveClass('main-nav__item');
    expect(screen.getByText(fakeLink.name)).toHaveClass('link');
  });

  it('should render correctly when missing "isFooter"', () => {
    const expectedItemContainerTestId = 'navigation-item-container';
    const fakeLink = {name: 'Гарантии', link: '#'};
    const preparedComponent = withHistory(<NavigationItem navigationItem={fakeLink}/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedItemContainerTestId)).toHaveClass('main-nav__item');
    expect(screen.getByText(fakeLink.name)).toHaveClass('main-nav__link');
    expect(screen.getByText(fakeLink.name)).not.toHaveClass('link');
  });
});
