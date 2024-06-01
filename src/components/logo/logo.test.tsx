import { withHistory } from '../../mock-component';
import Logo from './logo';
import { render, screen } from '@testing-library/react';

describe('Component: Logo', () => {
  it('should render correctly when missing "isFooter"', () => {
    const expectedLogoContainerTestId = 'logo-container';
    const preparedComponent = withHistory(<Logo />);

    render(preparedComponent);

    expect(screen.getByTestId(expectedLogoContainerTestId)).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId(expectedLogoContainerTestId)).toHaveClass('header__logo');
    expect(screen.getByTestId(expectedLogoContainerTestId)).not.toHaveClass('footer__logo');
  });

  it('should render correctly when "isFooter"', () => {
    const expectedLogoContainerTestId = 'logo-container';
    const preparedComponent = withHistory(<Logo isFooter/>);

    render(preparedComponent);

    expect(screen.getByTestId(expectedLogoContainerTestId)).toHaveClass('footer__logo');
    expect(screen.getByTestId(expectedLogoContainerTestId)).not.toHaveClass('header__logo');
  });
});
