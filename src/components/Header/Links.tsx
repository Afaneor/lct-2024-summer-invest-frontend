export interface LinkProps {
  title: string | React.ReactNode
  href: string
  isTab?: boolean
  isProfileTab?: true
}

export interface LinksKeys {
  HOME: LinkProps
  SMART_ASSISTANT: LinkProps
  OFFERS: LinkProps
  SUPPORTS: LinkProps
  AREAS: LinkProps
  BLOG: LinkProps
  MY_CABINET: LinkProps
  PROFILE: LinkProps
  INFO: LinkProps
  BUSINESS: LinkProps
  SEARCH_HISTORY: LinkProps
  FAQ: LinkProps
  COMPARE: LinkProps
  REQUESTS: LinkProps
  SUBSCRIPTIONS: LinkProps
  EVENTS: LinkProps
}

export const Links: LinksKeys = {
  HOME: {
    title: (
      <>
        Do
        <span style={{ color: '#EF0F33' }}>lma</span>
      </>
    ),
    href: '/',
    isTab: true,
  },
  SMART_ASSISTANT: {
    title: 'Умный помощник',
    href: '/smart-assistant',
    isTab: true,
  },
  OFFERS: {
    title: 'Предложения от партнеров',
    href: '/offers',
    isTab: false,
  },
  SUPPORTS: {
    title: 'Меры поддержки',
    href: '/supports',
    isTab: true,
  },
  AREAS: {
    title: 'Промплощадки',
    href: '/areas',
    isTab: false,
  },
  BLOG: {
    title: 'Блог',
    href: '/blog',
    isTab: false,
  },
  MY_CABINET: {
    title: 'Личный кабинет',
    href: '/my-cabinet',
    isTab: false,
  },
  PROFILE: {
    title: 'Профиль',
    href: '/profile',
    isTab: false,
  },
  INFO: {
    title: 'Общие данные',
    href: '/info',
    isTab: false,
    isProfileTab: true,
  },
  BUSINESS: {
    title: 'Мой бизнес',
    href: '/business',
    isTab: false,
    isProfileTab: true,
  },
  REQUESTS: {
    title: 'Запросы',
    href: '/requests',
    isTab: false,
    isProfileTab: true,
  },
  SUBSCRIPTIONS: {
    title: 'Подписки',
    href: '/subscriptions',
    isTab: false,
    isProfileTab: true,
  },
  COMPARE: {
    title: 'Сравнения',
    href: '/compare',
    isTab: false,
    isProfileTab: true,
  },
  SEARCH_HISTORY: {
    title: 'История подбора площадок',
    href: '/search-history',
    isTab: false,
  },
  FAQ: {
    title: 'Вопросы и ответы',
    href: '/faq',
    isTab: true,
  },
  EVENTS: {
    title: 'Мероприятия',
    href: '/events',
    isTab: true,
  },
}

export const FirstLineLinks = [
  {
    title: '+7 (495) 123-45-67',
    href: 'tel:+74951234567',
  },
  {
    title: 'Единая линия поддержки',
    href: 'https://t.me/pavlin_share',
  },
]
