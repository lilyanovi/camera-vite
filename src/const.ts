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
