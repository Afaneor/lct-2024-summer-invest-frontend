import { Card, Col, Row, Space, Spin } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'

import ButtonRounded from '../ButtonRounded/ButtonRounded'
import styles from './PageCardContainer.module.scss'

interface PageCardContainerProps {
  isLoading?: boolean
  title?: string
  mainContent?: React.ReactNode
  additionalContent?: React.ReactNode
  isEditable?: React.ReactNode
  onRemove?: () => void
  onUpdate?: () => void
}
const cardStyle = {
  border: '1px solid #E5E5E5',
} as React.CSSProperties
const PageCardContainer: FCC<PageCardContainerProps> = ({
  title,
  children,
  additionalContent,
  isLoading,
  isEditable,
  onRemove,
  onUpdate,
}) => {
  if (isLoading) {
    return <Spin spinning />
  }
  return (
    <div className={styles.container}>
      <Card style={cardStyle}>
        <Row>
          <Col xs={24} md={additionalContent ? 16 : 24}>
            {title ? <BebasNeueTitle title={title} level={3} /> : null}
            {children}
          </Col>
          {additionalContent ? (
            <Col xs={24} md={8}>
              {additionalContent}
            </Col>
          ) : null}
          {isEditable ? (
            <Col span={24}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                <Space direction='horizontal'>
                  <ButtonRounded size='large' type='text' onClick={onUpdate}>
                    Обновить
                  </ButtonRounded>
                  <ButtonRounded
                    size='large'
                    type='text'
                    danger
                    onClick={onRemove}
                  >
                    Удалить
                  </ButtonRounded>
                </Space>
              </div>
            </Col>
          ) : null}
        </Row>
      </Card>
    </div>
  )
}

PageCardContainer.displayName = 'PageCardContainer'

export default PageCardContainer
