import { Types } from './const';
import { makeFakeCamera, makeFakeReview } from './mocks';
import { getCurrentReviews, getFormatDate, getIsActiveProducts, getPhoneByPost, getSortByDateReviews, getTypeForPhoto } from './utils';

describe('Function: getFormatDate', () => {
  it('should return result in format DD MMMM', ()=> {
    const mockDate = "2022-07-09T13:24:57.980Z";
    const result = getFormatDate(mockDate);
    expect(result).toBe('09 июля')
  });
});

describe('Function: getSortByDateReviews', () => {
  it('should return array reviews sorting by date', ()=> {
    const mockReviews = [
      {
      "id": "1",
      "createAt": "2021-01-09T13:24:57.980Z",
      "cameraId": 1,
      "userName": "Кирилл",
      "advantage": "Легкая в плане веса, удобная в интерфейсе",
      "disadvantage": "Быстро садиться зарядка",
      "review": "Это моя первая камера. Я в восторге, нареканий нет",
      "rating": 5
      },
      {
        "id": "2",
        "createAt": "2022-07-09T13:24:57.980Z",
        "cameraId": 1,
        "userName": "Frank",
        "advantage": "Легкая в плане веса, удобная в интерфейсе",
        "disadvantage": "Быстро садиться зарядка",
        "review": "Это моя первая камера. Я в восторге, нареканий нет",
        "rating": 4
        },
      {
        "id": "3",
        "createAt": "2023-07-09T13:24:57.980Z",
        "cameraId": 1,
        "userName": "Anna",
        "advantage": "Легкая в плане веса, удобная в интерфейсе",
        "disadvantage": "Быстро садиться зарядка",
        "review": "Это моя первая камера. Я в восторге, нареканий нет",
        "rating": 3
        }
    ];
    const expectedResult = [
      {
        "id": "3",
        "createAt": "2023-07-09T13:24:57.980Z",
        "cameraId": 1,
        "userName": "Anna",
        "advantage": "Легкая в плане веса, удобная в интерфейсе",
        "disadvantage": "Быстро садиться зарядка",
        "review": "Это моя первая камера. Я в восторге, нареканий нет",
        "rating": 3
        },
      {
        "id": "2",
        "createAt": "2022-07-09T13:24:57.980Z",
        "cameraId": 1,
        "userName": "Frank",
        "advantage": "Легкая в плане веса, удобная в интерфейсе",
        "disadvantage": "Быстро садиться зарядка",
        "review": "Это моя первая камера. Я в восторге, нареканий нет",
        "rating": 4
        },
      {
      "id": "1",
      "createAt": "2021-01-09T13:24:57.980Z",
      "cameraId": 1,
      "userName": "Кирилл",
      "advantage": "Легкая в плане веса, удобная в интерфейсе",
      "disadvantage": "Быстро садиться зарядка",
      "review": "Это моя первая камера. Я в восторге, нареканий нет",
      "rating": 5
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
    const mockCurrentReviews = [mockReviews[0], mockReviews[1], mockReviews[2]]
    const result = getCurrentReviews(mockReviews, mockCurrentReviews);

    expect(result.length).toBe(6);
    expect(result).toEqual([mockReviews[0], mockReviews[1], mockReviews[2], mockReviews[3], mockReviews[4], mockReviews[5]]);
  });
});

describe('Function: getTypeForPhoto', () => {
  it('should return "Цифровой" when type="Types.Digital"', ()=> {
    const expectedResult = "Цифровой";
    const result = getTypeForPhoto(Types.Digital);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Types.Digital);
  });

  it('should return "Коллекционный" when type="Types.Collectible"', ()=> {
    const expectedResult = "Коллекционный";
    const result = getTypeForPhoto(Types.Collectible);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Types.Collectible);
  });

  it('should return "Моментальный" when type="Types.Instant"', ()=> {
    const expectedResult = "Моментальный";
    const result = getTypeForPhoto(Types.Instant);
    expect(result).toBe(expectedResult);
    expect(result).not.toBe(Types.Instant);
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
