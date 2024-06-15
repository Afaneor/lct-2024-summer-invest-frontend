import { List } from 'antd'
import React from 'react'

import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { RequestListItem } from '@/components/RequestListItem'
import { useFilter } from '@/hooks/useFilter'
import type { SelectionRequestActualProps } from '@/models/SelectionRequest'
import { SelectionRequestModel } from '@/models/SelectionRequest'
import withAuth from '@/pages/HOC'
import MyProfileLayout from '@/templates/MyProfileLayout'
import type { ModelOptionProps } from '@/types'

const Model = SelectionRequestModel
const Requests = () => {
  const [filter] = useFilter()

  return (
    <MyProfileLayout>
      <FetchMoreItemsComponent
        model={Model}
        defFilters={filter}
        renderItems={({ data }) => (
          <List
            bordered
            itemLayout='horizontal'
            dataSource={[
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
              ...data,
            ]}
            renderItem={(
              item: ModelOptionProps<SelectionRequestActualProps>
            ) => <RequestListItem createdAt={item.created_at.value} />}
          />
        )}
      />
    </MyProfileLayout>
  )
}

export default withAuth(Requests)
