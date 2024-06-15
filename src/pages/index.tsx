import React from 'react'

import Landing from '@/landing'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'

export default function Index() {
  return (
    <Main
      meta={
        <Meta
          title='Главная'
          description='Умный помощник по комплексному подбору инвестиционных площадок'
        />
      }
    >
      <Landing />
    </Main>
  )
}
