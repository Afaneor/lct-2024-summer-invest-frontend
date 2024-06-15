import { Alert, Button, Col, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'

interface NeedModeResultsComponentProps {
  onClick?: () => void
}

const NeedModeResultsComponent: FCC<NeedModeResultsComponentProps> = ({
  onClick,
}) => {
  return (
    <Row>
      <Col span={24}>
        <Alert
          message={
            <BebasNeueTitle
              title='Вам понравилось то, что мы нашли?'
              style={{
                marginBottom: 0,
              }}
              level={3}
            />
          }
          type='info'
          action={
            <Button size='large' onClick={onClick}>
              Нужно больше вариантов
            </Button>
          }
        />
      </Col>
    </Row>
  )
}

NeedModeResultsComponent.displayName = 'NeedModeResultsComponent'

export default NeedModeResultsComponent
