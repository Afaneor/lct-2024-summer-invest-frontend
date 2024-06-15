import { Col, Row, Spin } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import BebasNeueTitle from '../BebasNeueTitle/BebasNeueTitle'
import BreadCrumbsComponent from '../BreadCrumbsComponent/BreadCrumbsComponent'
import styles from './PageWrapper.module.scss'

interface PageWrapperProps {
  title?: string
  subTitle?: string
  isLoading?: boolean
}
const PageWrapper: FCC<PageWrapperProps> = ({ isLoading, children, title }) => {
  return (
    <Spin spinning={!!isLoading}>
      <Row className={styles.container} justify='center'>
        <Col xs={24} className={styles.headerWrapper}>
          <Row justify='center' className='h100'>
            <Col xs={24} md={16} lg={16}>
              <BreadCrumbsComponent
                breadCrumbs={[
                  {
                    title: 'Бизнесу',
                  },
                  {
                    title: 'Умный помощник',
                  },
                ]}
              />
            </Col>
            {title ? (
              <Col xs={24} md={16} lg={16} className={styles.titleContainer}>
                <BebasNeueTitle title={title} level={2} />
              </Col>
            ) : null}
          </Row>
        </Col>
        <Col xs={24} lg={16}>
          {children}
        </Col>
      </Row>
    </Spin>
  )
}

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
