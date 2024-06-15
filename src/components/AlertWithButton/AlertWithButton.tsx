import { Alert, Col, Row } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'

import { BebasNeueTitle } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'

interface AlertWithButtonProps {
  title: string
  alertType: 'success' | 'info' | 'warning' | 'error'
  buttonText: string
  buttonIcon?: ReactNode
  onClick?: () => void
}

const AlertWithButton: React.FC<AlertWithButtonProps> = ({
  title,
  alertType,
  buttonText,
  buttonIcon,
  onClick,
}) => {
  return (
    <Row>
      <Col span={24}>
        <Alert
          message={
            <BebasNeueTitle
              title={title}
              style={{
                marginBottom: 0,
              }}
              level={3}
            />
          }
          type={alertType}
          action={
            <ButtonPrimaryRed size='large' icon={buttonIcon} onClick={onClick}>
              {buttonText}
            </ButtonPrimaryRed>
          }
        />
      </Col>
    </Row>
  )
}

AlertWithButton.displayName = 'AlertWithButton'

export default AlertWithButton
