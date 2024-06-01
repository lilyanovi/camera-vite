import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../mock-component';

import CatalogPage from './catalog-page';
import { makeFakeCamera, makeFakePromoProduct } from '../mocks';
import { StatusLoading } from '../const';

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    const expectedText = 'Каталог фото- и видеотехники';
    const { withStoreComponent } = withStore(<CatalogPage/>, {CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
