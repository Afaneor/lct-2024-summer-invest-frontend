import {
  HomeOutlined,
  LaptopOutlined,
  SketchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import React from 'react'

export interface LinkProps {
  title: string
  href: string
  icon?: React.ReactNode
  isTab?: boolean
}

export interface LinksKeys {
  HOME: LinkProps
  SMART_ASSISTANT: LinkProps
  OFFERS: LinkProps
  SUPPORTS: LinkProps
  AREAS: LinkProps
  BLOG: LinkProps
  MY_PROFILE: LinkProps
  PROFILE: LinkProps
  INFO: LinkProps
  BUSINESS: LinkProps
  SEARCH_HISTORY: LinkProps
}

export const Links: LinksKeys = {
  HOME: {
    title: 'Главная',
    href: '/',
    icon: <HomeOutlined />,
    isTab: true,
  },
  SMART_ASSISTANT: {
    title: 'Умный помощник',
    href: '/smart-assistant',
    icon: <UsergroupAddOutlined />,
    isTab: true,
  },
  OFFERS: {
    title: 'Предложения от партнеров',
    href: '/offers',
    icon: <UsergroupAddOutlined />,
    isTab: true,
  },
  SUPPORTS: {
    title: 'Меры поддержки',
    href: '/supports',
    icon: <SketchOutlined />,
    isTab: true,
  },
  AREAS: {
    title: 'Промплощадки',
    href: '/areas',
    icon: <SketchOutlined />,
    isTab: true,
  },
  BLOG: {
    title: 'Блог',
    href: '/blog',
    icon: <LaptopOutlined />,
    isTab: true,
  },
  MY_PROFILE: {
    title: 'Личный кабинет',
    href: '/my-cabinet',
    icon: <UsergroupAddOutlined />,
    isTab: false,
  },
  PROFILE: {
    title: 'Профиль',
    href: '/profile',
    icon: <UsergroupAddOutlined />,
    isTab: false,
  },
  INFO: {
    title: 'Общие данные',
    href: '/info',
    icon: <UsergroupAddOutlined />,
    isTab: false,
  },
  BUSINESS: {
    title: 'Мой бизнес',
    href: '/business',
    icon: <UsergroupAddOutlined />,
    isTab: false,
  },
  SEARCH_HISTORY: {
    title: 'История подбора площадок',
    href: '/search-history',
    icon: <UsergroupAddOutlined />,
    isTab: false,
  },
}

export const FirstLineLinks = [
  {
    title: '+7 (495) 123-45-67',
    href: '/',
  },
  {
    title: 'Единая линия поддержки',
    href: '/',
  },
]
