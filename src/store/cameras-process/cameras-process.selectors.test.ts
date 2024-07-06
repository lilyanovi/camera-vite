import { Levels, NameSpace, START_PAGE, SortDirections, SortOption, StatusLoading } from '../../const';
import { makeFakePromoProduct } from '../../mocks';
import { TCamera } from '../../types/camera';
import { selectCameras, selectCurrentCamerasList, selectCurrentPage, selectFilteredCameras, selectFilteredSettings, selectPromoProducts, selectSortCameras, selectSortDirection, selectSortOption, selectStatusLoading } from './cameras-process.selectors';

describe('CamerasProcess selectors', () => {
  const state = {
    [NameSpace.Cameras]: {
      cameras: [{
        id: 1,
        name: 'Ретрокамера Dus Auge lV',
        vendorCode: 'DA4IU67AD5',
        type: 'Коллекционная',
        category: 'Видеокамера',
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: 'Нулевой',
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      }, {
        id: 2,
        name: 'FastShot MR-5',
        vendorCode: 'DA4IU67AD5',
        type: 'Цифровая',
        category: 'Фотоаппарат',
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: 'Любительский',
        price: 18970,
        rating: 2,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      }, {
        id: 3,
        name: 'Instaprinter P2"',
        vendorCode: 'DA4IU67AD5',
        type: 'Цифровая',
        category: 'Видеокамера',
        description: 'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: 'Нулевой',
        price: 6500,
        rating: 3,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp'
      }] as TCamera[],
      promoProducts: new Array(4).fill(null).map(() => makeFakePromoProduct()),
      statusLoading: StatusLoading.Success,
      sort: SortOption.sortPrice,
      direction: SortDirections.up,
      currentPage: START_PAGE,
      filteredSettings: {
        price: 700,
        priceUp: null,
        level: Levels.Zero,
        category: null,
        type: [],
      }
    }
  };
  it('should return statusLoading from state', () => {
    const { statusLoading } = state[NameSpace.Cameras];
    const result = selectStatusLoading(state);
    expect(result).toBe(statusLoading);
  });
  it('should return cameras from state', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = selectCameras(state);
    expect(result).toEqual(cameras);
  });
  it('should return promoProducts from state', () => {
    const { promoProducts } = state[NameSpace.Cameras];
    const result = selectPromoProducts(state);
    expect(result).toEqual(promoProducts);
  });
  it('should return filteredSettings from state', () => {
    const { filteredSettings } = state[NameSpace.Cameras];
    const result = selectFilteredSettings(state);
    expect(result).toEqual(filteredSettings);
  });
  it('should return sort from state', () => {
    const { sort } = state[NameSpace.Cameras];
    const result = selectSortOption(state);
    expect(result).toEqual(sort);
  });
  it('should return direction from state', () => {
    const { direction } = state[NameSpace.Cameras];
    const result = selectSortDirection(state);
    expect(result).toEqual(direction);
  });
  it('should return currentPage from state', () => {
    const { currentPage } = state[NameSpace.Cameras];
    const result = selectCurrentPage(state);
    expect(result).toEqual(currentPage);
  });
  it('should return filteredCameras', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = selectFilteredCameras(state);
    expect(result).toEqual([cameras[0], cameras[2]]);
  });
  it('should return sortCameras', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = selectSortCameras(state);
    expect(result).toEqual([cameras[2], cameras[0]]);
  });
  it('should return currentCamerasList', () => {
    const { cameras } = state[NameSpace.Cameras];
    const result = selectCurrentCamerasList(state);
    expect(result).toEqual([cameras[2], cameras[0]]);
  });
});
