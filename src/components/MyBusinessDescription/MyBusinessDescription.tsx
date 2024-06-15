import { Space } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'

interface MyBusinessDescriptionProps {
  value?: any
  label?: string
}

const MyBusinessDescription: FCC<MyBusinessDescriptionProps> = ({
  label,
  value,
}) => {
  return (
    <Space direction='vertical'>
      <span>{label}</span>
      {value ? (
        <BebasNeueTitle title={value} level={4} />
      ) : (
        <BebasNeueTitle title='Не указано' level={5} />
      )}
    </Space>
  )
}

MyBusinessDescription.displayName = 'MyBusinessDescription'

export default MyBusinessDescription
