import { Alert, Col, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'

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
              title='Вам понравилось то, что вы нашли?'
              style={{
                marginBottom: 0,
              }}
              level={3}
            />
          }
          type='error'
          action={
            <ButtonPrimaryRed size='large' onClick={onClick}>
              Нужно больше вариантов
            </ButtonPrimaryRed>
          }
        />
      </Col>
    </Row>
  )
}

NeedModeResultsComponent.displayName = 'NeedModeResultsComponent'

export default NeedModeResultsComponent
