import { Col, Row, Typography } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { MyBusinessDescription } from '@/components/MyBusinessDescription'
import { TruncateText } from '@/components/TruncateText'
import type { ReadyBusinessModelProps } from '@/models/ReadyBusiness'

const { Text } = Typography
interface ReadyBusinessDescriptionProps {
  readyBusinessData: ReadyBusinessModelProps
}

const ReadyBusinessDescription: FCC<ReadyBusinessDescriptionProps> = ({
  readyBusinessData,
}) => {
  if (!readyBusinessData) {
    return null
  }
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24}>
        <Text
          style={{
            fontSize: '14px',
          }}
        >
          <TruncateText text={readyBusinessData?.description} length={400} />
        </Text>
      </Col>
      <Col xs={24}>
        <Row gutter={[20, 20]}>
          {readyBusinessData?.extra_data &&
            Object.entries(readyBusinessData?.extra_data).map(([key, val]) => {
              return (
                <Col xs={8} key={key}>
                  <MyBusinessDescription label={key} value={val} />
                </Col>
              )
            })}
        </Row>
      </Col>
    </Row>
  )
}

ReadyBusinessDescription.displayName = 'ReadyBusinessDescription'

export default ReadyBusinessDescription
