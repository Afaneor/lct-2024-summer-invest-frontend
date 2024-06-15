import { Col, Space } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'

interface MyBusinessDescriptionProps {
  value?: any
  label?: string
}

const MyBusinessDescription: FCC<MyBusinessDescriptionProps> = ({
  label,
  value,
}) => {
  return (
    <Col xs={24} md={8}>
      <Space direction='vertical'>
        <span>{label}</span>
        {value ? (
          <BebasNeueTitle title={value} level={4} />
        ) : (
          <BebasNeueTitle title='Не указано' level={5} />
        )}
      </Space>
    </Col>
  )
}

MyBusinessDescription.displayName = 'MyBusinessDescription'

export default MyBusinessDescription
