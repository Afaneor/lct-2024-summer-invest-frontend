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
          description='Умный помощник подбора и оценки территорий для вовлечения в хозяйственный оборот'
        />
      }
    >
      <Landing />
    </Main>
  )
}
