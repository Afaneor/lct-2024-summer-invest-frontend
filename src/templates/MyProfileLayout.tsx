import React from 'react'

import { Links } from '@/components/Header/Links'
import { PageWrapper } from '@/components/PageWrapper'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { FCC } from '@/types'

import LinkedTabs from '../components/LinkedTabs/LinkedTabs'

const MyProfileLayout: FCC = ({ children }) => {
  const commonHref = `${Links?.MY_CABINET?.href}${Links?.PROFILE?.href}`
  const tabs = [
    {
      title: Links?.INFO?.title || '',
      href: `${commonHref}${Links?.INFO?.href}`,
    },
    {
      title: Links?.BUSINESS?.title || '',
      href: `${commonHref}${Links?.BUSINESS?.href}`,
    },
    {
      title: Links?.SEARCH_HISTORY?.title || '',
      href: `${commonHref}${Links?.SEARCH_HISTORY?.href}`,
    },
  ]
  return (
    <Main meta={<Meta title='Профиль' description='Мой профиль' />}>
      <PageWrapper
        title='Профиль'
        subTitle='Мой профиль'
        underTitleContainer={<LinkedTabs linkedTabs={tabs} />}
      >
        {children}
      </PageWrapper>
    </Main>
  )
}

export default MyProfileLayout
