import {
  CalculatorOutlined,
  HomeOutlined,
  LaptopOutlined,
  SketchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import React from 'react'

export const Links = [
  {
    title: 'Дом',
    href: '/',
    icon: <HomeOutlined />,
  },
  {
    title: 'Калькулятор',
    href: '/calculator',
    icon: <CalculatorOutlined />,
  },
  {
    title: 'Умный помощник',
    href: '/smart-assistant',
    icon: <UsergroupAddOutlined />,
  },
  {
    title: 'Предложения от партнеров',
    href: '/offers',
    icon: <UsergroupAddOutlined />,
  },
  {
    title: 'Меры поддержки',
    href: '/supports',
    icon: <SketchOutlined />,
  },
  {
    title: 'Промплощадки',
    href: '/areas',
    icon: <SketchOutlined />,
  },
  // {
  //   title: 'Аналитика',
  //   href: '/analytics',
  //   icon: <SketchOutlined />,
  // },
  {
    title: 'Блог',
    href: '/blog',
    icon: <LaptopOutlined />,
  },
]

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
