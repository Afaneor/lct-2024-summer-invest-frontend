import React from 'react'

import type { LinkProps } from '@/components/Header/Links'
import { Links } from '@/components/Header/Links'
import { LinkedTabs } from '@/components/LinkedTabs'
import { PageWrapper } from '@/components/PageWrapper'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'
import type { FCC } from '@/types'

const MyProfileLayout: FCC = ({ children }) => {
  const commonHref = `${Links?.MY_CABINET?.href}${Links?.PROFILE?.href}`
  const tabs = Object.values(Links)
    .filter((val: LinkProps) => val.isProfileTab)
    .map((lnk) => {
      return {
        href: `${commonHref}${lnk.href}`,
        title: lnk.title,
      }
    })
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
