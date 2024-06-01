import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../mock-component';
import Layout from './layout';


describe('Component: Layout', () => {
  it('should render correctly', () => {
    const expectedLayoutContainerTestId = 'layout-container';
    const expectedHeaderContainerTestId = 'header-container';
    const expectedText = 'Интернет-магазин фото- и видеотехники';
    const { withStoreComponent } = withStore(<Layout/>);
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedLayoutContainerTestId)).toBeInTheDocument();
    expect(screen.getByTestId(expectedHeaderContainerTestId)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});


