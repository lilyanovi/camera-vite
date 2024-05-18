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
}

export enum ActiveTabs {
  Characteristics = 'characteristics',
  Description = 'description',
}

export enum APIRoute {
  Camera = '/cameras',
  Order = '/order',
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
      link: '#'
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
  PHONE: {
    Required: 'Нужно указать номер',
    Pattern: 'Укажите номер в формате +7(9XX)XXX-XX-XX'
  },
};

export const PatternsForCheck = {
  PHONE: /^\+?[78][ /(]?[0-9]{3}[ /)]?[0-9]{3}[- ]?[0-9]{2}[- ]?[0-9]{2}$/,
};

export const BANNER_CHANGE_TIME = 3000;
