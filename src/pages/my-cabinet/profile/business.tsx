import React from 'react'

import { InfinityListComponent } from '@/components/InfinityListComponent'
import { PageCardContainer } from '@/components/PageCardContainer'
import { BusinessModel } from '@/models/Business'
import withAuth from '@/pages/HOC'
import MyProfileLayout from '@/templates/MyProfileLayout'

const Model = BusinessModel
const MyProfileBusiness = () => {
  return (
    <MyProfileLayout>
      <InfinityListComponent
        model={Model}
        noDataText='Вы прочитали весь блог! 😎'
        renderList={(fetchedValues) => (
          <PageCardContainer title='Ваши организации'>
            {JSON.stringify(fetchedValues)}
          </PageCardContainer>
        )}
      />
    </MyProfileLayout>
  )
}

export default withAuth(MyProfileBusiness)
