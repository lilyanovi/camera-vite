import { Category, Level, START_PAGE, SortDirection, SortOption, StatusLoading } from '../../const';
import { makeFakeCamera, makeFakePromoProduct } from '../../mocks';
import { fetchCamerasListAction, fetchPromoProductsListAction } from '../api-actions';
import { camerasProcess, changeCurrentPage, changeFilteredSettings, changeSortDirection, changeSortOption } from './cameras-process.slice';

describe('CamerasProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cameras: new Array(5).fill(null).map(() => makeFakeCamera()),
      promoProducts: new Array(4).fill(null).map(() => makeFakePromoProduct()),
      statusLoading: StatusLoading.Success,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(expectedState, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(undefined, emptyAction);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Loading" with "fetchCamerasListAction.pending"', () => {
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.pending);
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Success", "cameras" to array with "fetchCamerasListAction.fulfilled"', () => {
    const mockCameras = makeFakeCamera();
    const expectedState = {
      cameras: [mockCameras],
      promoProducts: [],
      statusLoading: StatusLoading.Success,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.fulfilled(
      [mockCameras], '', undefined
    ));
    expect(result).toEqual(expectedState);
  });
  it('should set "statusLoading" to "StatusLoading.Failed" with "fetchCamerasListAction.rejected"', () => {
    const expectedState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Failed,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(undefined, fetchCamerasListAction.rejected);
    expect(result).toEqual(expectedState);
  });
  it('should set "promoProducts" to array with "fetchPromoProductsListAction.fulfilled"', () => {
    const mockPromoProducts = makeFakePromoProduct();
    const expectedState = {
      cameras: [],
      promoProducts: [mockPromoProducts],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const result = camerasProcess.reducer(undefined, fetchPromoProductsListAction.fulfilled(
      [mockPromoProducts], '', undefined
    ));
    expect(result).toEqual(expectedState);
  });
  it('should change "sort" with "changeSortOption" action', () => {

    const initialState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const expectedSort = SortOption.sortPopular;
    const result = camerasProcess.reducer(initialState, changeSortOption({
      sort: expectedSort
    }));
    expect(result.sort).toBe(expectedSort);
  });
  it('should change "direction" with "changeSortDirection" action', () => {

    const initialState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const expectedDirection = SortDirection.down;
    const result = camerasProcess.reducer(initialState, changeSortDirection({
      direction: expectedDirection
    }));
    expect(result.direction).toBe(expectedDirection);
  });
  it('should change "currentPage" with "changeCurrentPage" action', () => {

    const initialState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const expectedCurrentPage = 5;
    const result = camerasProcess.reducer(initialState, changeCurrentPage({
      currentPage: expectedCurrentPage
    }));
    expect(result.currentPage).toBe(expectedCurrentPage);
  });
  it('should change "filteredSettings" with "changeFilteredSettings" action', () => {

    const initialState = {
      cameras: [],
      promoProducts: [],
      statusLoading: StatusLoading.Loading,
      filteredSettings: {
        price: null,
        priceUp: null,
        level: [],
        category: null,
        type: [],
      },
      sort: SortOption.sortPrice,
      direction: SortDirection.up,
      currentPage: START_PAGE,
    };
    const expectedSettings = {
      price: 1990,
      priceUp: null,
      level: [Level.Professional],
      category: Category.Videocamera,
      type: [],
    };
    const result = camerasProcess.reducer(initialState, changeFilteredSettings(expectedSettings));
    expect(result.filteredSettings).toEqual(expectedSettings);
    expect(result.filteredSettings.price).toBe(expectedSettings.price);
    expect(result.filteredSettings.category).toBe(expectedSettings.category);
  });
});
