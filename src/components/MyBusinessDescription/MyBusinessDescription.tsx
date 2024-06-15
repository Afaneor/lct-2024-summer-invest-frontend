import { Space } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'

interface MyBusinessDescriptionProps {
  value?: any
  label?: string
  renderValue?: React.ReactNode
}

const MyBusinessDescription: FCC<MyBusinessDescriptionProps> = ({
  label,
  value,
  renderValue,
}) => {
  return (
    <Space direction='vertical'>
      <span>{label}</span>
      {value !== undefined ? (
        <BebasNeueTitle
          style={{
            letterSpacing: '0.01em',
          }}
          title={value || 'Не указано'}
          level={value ? 4 : 5}
        />
      ) : (
        renderValue
      )}
    </Space>
  )
}

MyBusinessDescription.displayName = 'MyBusinessDescription'

export default MyBusinessDescription
