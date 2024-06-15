import { Card, Col, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'

import styles from './PageCardContainer.module.scss'

interface PageCardContainerProps {
  title: string
  mainContent?: React.ReactNode
  additionalContent?: React.ReactNode
}

const PageCardContainer: FCC<PageCardContainerProps> = ({
  title,
  children,
  additionalContent,
}) => {
  return (
    <div className={styles.container}>
      <Card
        style={{
          border: '1px solid #E5E5E5',
        }}
      >
        <Row>
          <Col xs={24} md={16}>
            <BebasNeueTitle title={title} level={3} />
            {children}
          </Col>
          <Col xs={24} md={8}>
            {additionalContent}
          </Col>
        </Row>
      </Card>
    </div>
  )
}

PageCardContainer.displayName = 'PageCardContainer'

export default PageCardContainer
