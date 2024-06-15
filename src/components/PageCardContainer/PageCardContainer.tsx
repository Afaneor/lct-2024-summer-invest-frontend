import { Card, Col, Row, Spin } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'

import styles from './PageCardContainer.module.scss'

interface PageCardContainerProps {
  isLoading?: boolean
  title?: string
  mainContent?: React.ReactNode
  additionalContent?: React.ReactNode
}
const cardStyle = {
  border: '1px solid #E5E5E5',
} as React.CSSProperties
const PageCardContainer: FCC<PageCardContainerProps> = ({
  title,
  children,
  additionalContent,
  isLoading,
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
        </Row>
      </Card>
    </div>
  )
}

PageCardContainer.displayName = 'PageCardContainer'

export default PageCardContainer
