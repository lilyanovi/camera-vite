import { Category, Level, SortDirection, SortOption, Type } from './const';
import { makeFakeCamera, makeFakeReview } from './mocks';
import { TCamera } from './types/camera';
import { getCurrentReviews, getFilteredCameras, getFilteredCamerasList, getFormatDate, getIsActiveProducts, getMinMaxPrice, getPhoneByPost, getQueryObject, getSortByDateReviews, getSortCamerasList, getTypeForPhoto } from './utils';

describe('Function: getFormatDate', () => {
  it('should return result in format DD MMMM', ()=> {
    const mockDate = '2022-07-09T13:24:57.980Z';
    const result = getFormatDate(mockDate);
    expect(result).toBe('09 июля');
  });
});

describe('Function: getSortByDateReviews', () => {
  it('should return array reviews sorting by date', ()=> {
    const mockReviews = [
      {
        'id': '1',
        'createAt': '2021-01-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Кирилл',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 5
      },
      {
        'id': '2',
        'createAt': '2022-07-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Frank',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 4
      },
      {
        'id': '3',
        'createAt': '2023-07-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Anna',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 3
      }
    ];
    const expectedResult = [
      {
        'id': '3',
        'createAt': '2023-07-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Anna',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 3
      },
      {
        'id': '2',
        'createAt': '2022-07-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Frank',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 4
      },
      {
        'id': '1',
        'createAt': '2021-01-09T13:24:57.980Z',
        'cameraId': 1,
        'userName': 'Кирилл',
        'advantage': 'Легкая в плане веса, удобная в интерфейсе',
        'disadvantage': 'Быстро садиться зарядка',
        'review': 'Это моя первая камера. Я в восторге, нареканий нет',
        'rating': 5
      }
    ];
    const result = getSortByDateReviews(mockReviews);
    expect(result).toEqual(expectedResult);
  });
});

describe('Function: getCurrentReviews', () => {
  it('should return correctly result when is not "currentReviews"', ()=> {
    const mockReviews = new Array(5).fill(null).map(() => makeFakeReview());
    const result = getCurrentReviews(mockReviews);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockReviews[0], mockReviews[1], mockReviews[2]]);
  });

  it('should return correctly result when currentReview.length > 0', ()=> {
    const mockReviews = new Array(7).fill(null).map(() => makeFakeReview());
    const mockCurrentReviews = [mockReviews[0], mockReviews[1], mockReviews[2]];
    const result = getCurrentReviews(mockReviews, mockCurrentReviews);

    expect(result.length).toBe(6);
    expect(result).toEqual([mockReviews[0], mockReviews[1], mockReviews[2], mockReviews[3], mockReviews[4], mockReviews[5]]);
  });
});

describe('Function: getTypeForPhoto', () => {
  it('should return "Цифровой" when type="Type.Digital"', ()=> {
    const expectedResult = 'Цифровой';
    const result = getTypeForPhoto(Type.Digital);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Type.Digital);
  });

  it('should return "Коллекционный" when type="Type.Collectible"', ()=> {
    const expectedResult = 'Коллекционный';
    const result = getTypeForPhoto(Type.Collection);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Type.Collection);
  });

  it('should return "Моментальный" when type="Type.Snapshot"', ()=> {
    const expectedResult = 'Моментальный';
    const result = getTypeForPhoto(Type.Snapshot);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Type.Snapshot);
  });
});

describe('Function: getPhoneByPost', () => {
  it('should return result in format +7##########', ()=> {
    const firstResult = getPhoneByPost('8(456)566-55-33');
    const secondResult = getPhoneByPost('7 456 000 55 33');

    expect(firstResult).toBe('+74565665533');
    expect(secondResult).toBe('+74560005533');
  });
});

describe('Function: getIsActiveProducts', () => {
  it('should return correctly result when is not "isActiveProducts"', ()=> {
    const mockCameras = new Array(8).fill(null).map(() => makeFakeCamera());
    const result = getIsActiveProducts(mockCameras);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockCameras[0].id, mockCameras[1].id, mockCameras[2].id]);
  });

  it('should return correctly result when is not "isActiveProducts" and products.length < 3', ()=> {
    const mockCameras = new Array(2).fill(null).map(() => makeFakeCamera());
    const result = getIsActiveProducts(mockCameras);

    expect(result.length).toBe(2);
    expect(result).toEqual([mockCameras[0].id, mockCameras[1].id]);
  });

  it('should return correctly result when "isActiveProducts"', ()=> {
    const mockCameras = new Array(5).fill(null).map(() => makeFakeCamera());
    const mockIsActiveProducts = [mockCameras[0].id, mockCameras[1].id, mockCameras[2].id];
    const result = getIsActiveProducts(mockCameras, mockIsActiveProducts);

    expect(result.length).toBe(2);
    expect(result).toEqual([mockCameras[3].id, mockCameras[4].id]);
  });

  it('should return correctly result when "isActiveProducts" and "isPrev"', ()=> {
    const mockCameras = new Array(5).fill(null).map(() => makeFakeCamera());
    const mockIsActiveProducts = [mockCameras[3].id, mockCameras[4].id];
    const mockIsPrev = true;
    const result = getIsActiveProducts(mockCameras, mockIsActiveProducts, mockIsPrev);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockCameras[0].id, mockCameras[1].id, mockCameras[2].id]);
  });
});

describe('Function: getFilteredCameras', () => {
  it('should return filtered array', ()=> {
    const mockCameras = [{
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
    }] as TCamera[];
    const fakeValue = 'рет';
    const result = getFilteredCameras(mockCameras, fakeValue);

    expect(result.length).toBe(1);
    expect(result).toEqual([mockCameras[0]]);
  });
});

describe('Function: getSortCamerasList', () => {
  const mockCameras = [{
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
  }] as TCamera[];
  it('should return sorted array by price up', ()=> {
    const fakeSort = SortOption.sortPrice;
    const fakeDirection = SortDirection.up;
    const result = getSortCamerasList(fakeSort, mockCameras, fakeDirection);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockCameras[2], mockCameras[1], mockCameras[0]]);
  });
  it('should return sorted array by price down', ()=> {
    const fakeSort = SortOption.sortPrice;
    const fakeDirection = SortDirection.down;
    const result = getSortCamerasList(fakeSort, mockCameras, fakeDirection);

    expect(result.length).toBe(3);
    expect(result).toEqual(mockCameras);
  });
  it('should return sorted array by popular up', ()=> {
    const fakeSort = SortOption.sortPopular;
    const fakeDirection = SortDirection.up;
    const result = getSortCamerasList(fakeSort, mockCameras, fakeDirection);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockCameras[1], mockCameras[2], mockCameras[0]]);
  });

  it('should return sorted array by popular down', ()=> {
    const fakeSort = SortOption.sortPopular;
    const fakeDirection = SortDirection.down;
    const result = getSortCamerasList(fakeSort, mockCameras, fakeDirection);

    expect(result.length).toBe(3);
    expect(result).toEqual([mockCameras[0], mockCameras[2], mockCameras[1]]);
  });
});

describe('Function: getFilteredCamerasList', () => {
  const mockCameras = [{
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
  }] as TCamera[];
  it('should return correctly result when reset filters', ()=> {
    const fakePrice = null;
    const fakePriceUp = null;
    const fakeCategory = null;
    const fakeType = [] as Type[];
    const fakeLevel = [] as Level[];
    const result = getFilteredCamerasList(mockCameras, fakePrice, fakePriceUp, fakeCategory, fakeType, fakeLevel);

    expect(result.length).toBe(3);
    expect(result).toEqual(mockCameras);
  });
  it('should return correctly result when filters transferred', ()=> {
    const fakePrice = 18000;
    const fakePriceUp = 65000;
    const fakeCategory = Category.Photocamera;
    const fakeType = [Type.Digital];
    const fakeLevel = [Level.NonProfessional, Level.Zero];
    const result = getFilteredCamerasList(mockCameras, fakePrice, fakePriceUp, fakeCategory, fakeType, fakeLevel);

    expect(result.length).toBe(1);
    expect(result).toEqual([mockCameras[1]]);
  });
});

describe('Function: getQueryObject', () => {
  it('should return correctly result when "settings" = {}', ()=> {
    const fakeSettings = {};
    const fakeSort = SortOption.sortPopular;
    const fakeDirection = SortDirection.up;
    const fakePage = 1;
    const result = getQueryObject(fakeSettings, fakeSort, fakeDirection, fakePage);

    expect(Object.keys(result).length).toBe(3);
    expect(result.sort).toBe(fakeSort);
    expect(result.direction).toBe(fakeDirection);
    expect(result.page).toBe(String(fakePage));
  });
  it('should return correctly result when "settings" !== {}', ()=> {
    const fakeSettings = {
      type: [Type.Collection, Type.Film],
      category: Category.Videocamera
    };
    const fakeSort = SortOption.sortPrice;
    const fakeDirection = SortDirection.down;
    const fakePage = 5;
    const result = getQueryObject(fakeSettings, fakeSort, fakeDirection, fakePage);

    expect(Object.keys(result).length).toBe(5);
    expect(result.sort).toBe(fakeSort);
    expect(result.direction).toBe(fakeDirection);
    expect(result.page).toBe(String(fakePage));
    expect(result.category).toBe(fakeSettings.category);
    expect(result.type).toBe(fakeSettings.type.join('+'));
  });
});

describe('Function: getMinMaxPrice', () => {
  it('should return correctly result when cameras.length = 0', ()=> {
    const fakeCameras = [] as TCamera[];
    const result = getMinMaxPrice(fakeCameras);

    expect(Object.keys(result).length).toBe(2);
    expect(result.min).toBe('от');
    expect(result.max).toBe('до');
  });
  it('should return correctly result when cameras.length !== 0', ()=> {
    const fakeCameras = [{
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
    }] as TCamera[];
    const result = getMinMaxPrice(fakeCameras);

    expect(Object.keys(result).length).toBe(2);
    expect(result.min).toBe('6500');
    expect(result.max).toBe('65000');
  });
});
