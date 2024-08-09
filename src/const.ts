export enum AppRoute {
  Main = '/',
  Product = '/product',
  Cart = '/card',
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
  Order = 'ORDER',
  Cart = 'CART'
}

export enum ActiveTab {
  Characteristics = 'characteristics',
  Description = 'description',
}

export enum APIRoute {
  Camera = '/cameras',
  Order = '/orders',
  Promo = '/promo',
  Coupons = '/coupons',
  Reviews = '/reviews'
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

export enum Level {
  Zero = 'Нулевой',
  NonProfessional = 'Любительский',
  Professional = 'Профессиональный',
}

export enum Category {
  Photocamera = 'Фотоаппарат',
  Videocamera = 'Видеокамера',
}

export enum Type {
  Digital = 'Цифровая',
  Film = 'Плёночная',
  Snapshot = 'Моментальная',
  Collection = 'Коллекционная',
}

export const ErrorMessages = {
  Phone: {
    Required: 'Нужно указать номер',
    Pattern: 'Укажите номер в формате +7(9XX)XXX-XX-XX'
  },
  Promo: 'Промокод неверный',
  Post: 'Failed to send data',
  Rate: 'Нужно оценить товар',
  Name: {
    Required: 'Нужно указать имя',
    MinLength: 'Введите не менее 2 символов',
    MaxLength: 'Введите  не более 15 символов'
  },
  Plus: {
    Required: 'Нужно указать достоинства',
    MinLength: 'Введите не менее 10 символов',
    MaxLength: 'Введите не более 160 символов'
  },
  Minus: {
    Required: 'Нужно указать недостатки',
    MinLength: 'Введите не менее 10 символов',
    MaxLength: 'Введите не более 160 символов'
  },
  Comment: {
    Required: 'Нужно добавить комментарий',
    MinLength: 'Введите не менее 10 символов',
    MaxLength: 'Введите не более 160 символов'
  }
} as const;

export const Length = {
  UserName: {
    Max: 15,
    Min: 2
  },
  Text: {
    Max: 160,
    Min: 10,
  }
} as const;

export const PatternsForCheck = {
  Phone: /^\+?[78][ /(]?[0-9]{3}[ /)]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/,
  Promo: /^\S+$/,
} as const;

export const BANNER_CHANGE_TIME = 3000;

export const SLIDER_PRODUCTS_COUNT = 3;

export enum SortOption {
  sortPrice = 'по цене',
  sortPopular = 'по популярности',
}

export enum SortDirection {
  up = 'По возрастанию',
  down = 'По убыванию',
}

export const PER_PAGE_CAMERAS_COUNT = 9;

export const PAGINATION_PAGE_COUNT = 3;

export const START_PAGE = 1;

export enum QuantityCount {
  Min = 1,
  Max = 9
}
