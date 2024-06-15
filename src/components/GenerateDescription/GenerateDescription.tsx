import { Col, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { MyBusinessDescription } from '@/components/MyBusinessDescription'

interface RealEstateDescriptionProps {
  data: Record<string, any>
  childrenData: Record<string, any>
}

const GenerateDescription: FCC<RealEstateDescriptionProps> = ({
  data,
  childrenData,
}) => {
  return (
    <>
      <Row gutter={[20, 20]}>
        {Object.values(data).map((item: any) => (
          <Col xs={24} md={8} key={item?.label}>
            <MyBusinessDescription label={item?.label} value={item?.value} />
          </Col>
        ))}
      </Row>
      {childrenData ? (
        <Row gutter={[20, 20]}>
          {Object.values(childrenData).map((item: any) => (
            <Col xs={24} md={8} key={item?.label}>
              <MyBusinessDescription label={item?.label} value={item?.value} />
            </Col>
          ))}
        </Row>
      ) : null}
    </>
  )
}

GenerateDescription.displayName = 'RealEstateDescription'

export default GenerateDescription
