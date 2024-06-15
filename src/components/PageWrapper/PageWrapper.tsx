import { Col, Row, Spin } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import type { FCC } from 'src/types'

import { Links } from '@/components/Header/Links'

import BebasNeueTitle from '../BebasNeueTitle/BebasNeueTitle'
import BreadCrumbsComponent from '../BreadCrumbsComponent/BreadCrumbsComponent'
import styles from './PageWrapper.module.scss'

interface PageWrapperProps {
  title?: string
  subTitle?: string
  isLoading?: boolean
  breadCrumbs?: ItemType[]
}
const PageWrapper: FCC<PageWrapperProps> = ({
  isLoading,
  breadCrumbs,
  children,
  title,
}) => {
  const { pathname } = useRouter()

  const link = useMemo(() => {
    const res = Links.find((_link) => _link.href === pathname)

    return res
      ? { href: res.href, title: res.title }
      : { href: pathname, title: pathname }
  }, [pathname])

  return (
    <Spin spinning={!!isLoading}>
      <Row className={styles.container} justify='center'>
        <Col xs={24} className={styles.headerWrapper}>
          <Row justify='center' className='h100'>
            <Col
              xs={24}
              md={16}
              lg={16}
              style={{
                margin: '24px 0 32px',
              }}
            >
              <BreadCrumbsComponent breadCrumbs={breadCrumbs || [link]} />
            </Col>
            {title ? (
              <Col
                xs={24}
                md={16}
                lg={16}
                style={{
                  margin: '24px 0 8px',
                  padding: '0 0 8px',
                }}
              >
                <BebasNeueTitle
                  style={{
                    margin: 0,
                  }}
                  title={title}
                  level={2}
                />
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
