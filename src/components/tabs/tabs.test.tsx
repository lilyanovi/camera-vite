import { render, screen } from '@testing-library/react';
import Tabs from './tabs';
import { Categories, Levels, START_PAGE, SortDirections, SortOption, StatusLoading, Types } from '../../const';
import { withHistory, withStore } from '../../mock-component';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const fakeVendorCode = 'vendor';
    const fakeCategory = Categories.Photocamera;
    const fakeLevel = Levels.NonProfessional;
    const fakeDescription = 'description';
    const fakeType = Types.Snapshot;
    const { withStoreComponent } = withStore(
      <Tabs
        vendorCode={fakeVendorCode}
        category={fakeCategory}
        level={fakeLevel}
        description={fakeDescription}
        type={fakeType}
      />, {CAMERAS: {
        cameras: [makeFakeCamera()],
        promoProducts: [makeFakePromoProduct()],
        statusLoading: StatusLoading.Success,
        filteredSettings: {
          price: null,
          priceUp: null,
          level: [],
          category: null,
          type: [],
        },
        sort: SortOption.sortPrice,
        direction: SortDirections.up,
        currentPage: START_PAGE}});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText(fakeCategory)).toBeInTheDocument();
    expect(screen.getByText(fakeVendorCode)).toBeInTheDocument();
    expect(screen.getByText(fakeLevel)).toBeInTheDocument();
    expect(screen.getByText(fakeDescription)).toBeInTheDocument();
    expect(screen.getByText(fakeType)).toBeInTheDocument();
  });
});

