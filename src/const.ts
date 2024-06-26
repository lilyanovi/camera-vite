export enum AppRoute {
  Main = '/',
  Product = '/product'
}

export enum StatusLoading {
  None,
  Loading,
  Success,
  Failed,
}

export enum NameSpace {
  Cameras = 'CAMERAS',
  Product = 'PRODUCT',
  Reviews = 'REVIEWS',
  Order = 'ORDER'
}

export enum ActiveTabs {
  Characteristics = 'characteristics',
  Description = 'description',
}

export enum APIRoute {
  Camera = '/cameras',
  Order = '/orders',
  Promo = '/promo',
}

export const RatingItems = [1, 2, 3, 4, 5];

export const Socials = [
  {
    name: 'vk',
    label: 'Переход на страницу вконтакте'
  },
  {
    name: 'pinterest',
    label: 'Переход на страницу pinterest'
  },
  {
    name: 'reddit',
    label: 'Переход на страницу reddit'
  },
];

export const Links = {
  Navigation: [
    {
      name: 'Каталог',
      link: AppRoute.Main
    },
    {
      name: 'Гарантии',
      link: '#'
    },
    {
      name: 'Доставка',
      link: '#'
    },
    {
      name: 'О компании',
      link: '#'
    },
  ],
  Resources: [
    {
      name: 'Курсы операторов',
      link: '#'
    },
    {
      name: 'Блог',
      link: '#'
    },
    {
      name: 'Сообщество',
      link: '#'
    },
  ],
  Support: [
    {
      name: 'FAQ',
      link: '#'
    },
    {
      name: 'Задать вопрос',
      link: '#'
    },
  ]
};

export const STEP_REVIEWS_SHOWN = 3;

export enum Levels {
  Start = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export enum Categories {
  Video = 'Видеокамера',
  Photo = 'Фотоаппарат',
}

export enum Types {
  Collectible = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

export const ErrorMessages = {
  Phone: {
    Required: 'Нужно указать номер',
    Pattern: 'Укажите номер в формате +7(9XX)XXX-XX-XX'
  },
  Post: 'Failed to send data',
};

export const PatternsForCheck = {
  Phone: /^\+?[78][ /(]?[0-9]{3}[ /)]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/,
};

export const BANNER_CHANGE_TIME = 3000;

export const SLIDER_PRODUCTS_COUNT = 3;

export enum CouponTypes {
  Camera333 = 'camera-333',
  Camera444 = 'camera-444',
  Camera555 = 'camera-555',
}

export enum SortOption {
  sortPrice = 'по цене',
  sortPopular = 'по популярности',
}

export enum SortDirections {
  up = 'По возрастанию',
  down = 'По убыванию',
}
