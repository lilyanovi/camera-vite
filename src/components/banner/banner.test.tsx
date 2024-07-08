import { render, renderHook, screen } from '@testing-library/react';
import Banner from './banner';
import { withHistory, withStore } from '../../mock-component';
import { SortDirection, SortOption, START_PAGE, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import { useState } from 'react';
import { act } from 'react-dom/test-utils';

describe('Component: Banner', () => {
  it('should render correctly', () => {
    const expectedBannerContainerTestId = 'banner-container';
    const { withStoreComponent } = withStore(<Banner />, {
      CAMERAS: {cameras: [makeFakeCamera()], promoProducts: [makeFakePromoProduct()], statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      }}
    });
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByTestId(expectedBannerContainerTestId)).toBeInTheDocument();
  });

  it('should be correctly change state', () => {
    const fakePromoProducts = [makeFakePromoProduct(), makeFakePromoProduct(), makeFakePromoProduct()];
    const { withStoreComponent } = withStore(<Banner />, {
      CAMERAS: {cameras: [makeFakeCamera()], promoProducts: fakePromoProducts, statusLoading: StatusLoading.Success, sort: SortOption.sortPrice, direction: SortDirection.up, currentPage: START_PAGE, filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      }}
    });
    const preparedComponent = withHistory(withStoreComponent);
    const expectedCurrentPromo = 2;
    const { result } = renderHook(() => useState(0));
    const [initialCurrentPromo] = result.current;
    const [, setCurrentPromo] = result.current;

    act(() => setCurrentPromo(expectedCurrentPromo));
    const [newCurrentPromo] = result.current;
    render(preparedComponent);

    expect(initialCurrentPromo).toBe(0);
    expect(newCurrentPromo).toBe(expectedCurrentPromo);
  });
});
