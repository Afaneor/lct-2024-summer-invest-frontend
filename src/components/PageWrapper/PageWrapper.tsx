import { Col, Row, Spin } from 'antd'
import type { ItemType } from 'antd/es/breadcrumb/Breadcrumb'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import type { FCC } from 'src/types'

import { Links } from '@/components/Header/Links'
import useSplitPathname from '@/hooks/useSplitPathname'

import BebasNeueTitle from '../BebasNeueTitle/BebasNeueTitle'
import BreadCrumbsComponent from '../BreadCrumbsComponent/BreadCrumbsComponent'
import styles from './PageWrapper.module.scss'

interface PageWrapperProps {
  title?: string
  subTitle?: string
  isLoading?: boolean
  breadCrumbs?: ItemType[]
  tabsContainer?: React.ReactNode
  lastCrumb?: string
}

const colSizes = {
  xs: 24,
  md: 16,
  lg: 16,
}
const PageWrapper: FCC<PageWrapperProps> = ({
  isLoading,
  breadCrumbs,
  children,
  title,
  tabsContainer,
  lastCrumb,
}) => {
  const router = useRouter()

  const links: string[] = useSplitPathname(router.pathname)

  let computedCrumbs = useMemo(() => {
    return links.map((_link: string, index) => {
      return {
        title: Object.values(Links).find((route) => route.href === _link)
          ?.title,
        href:
          index + 1 !== links.length
            ? links.slice(0, index + 1).join('')
            : undefined,
      }
    })
  }, [links])

  if (lastCrumb) {
    computedCrumbs = computedCrumbs.concat({
      title: lastCrumb,
      href: undefined,
    })
  }

  return (
    <Row className={styles.container} justify='center'>
      <Col xs={24} className={styles.headerWrapper}>
        <Row justify='center' className='h100'>
          <Col
            {...colSizes}
            style={{
              margin: '24px 0 32px',
            }}
          >
            <BreadCrumbsComponent breadCrumbs={breadCrumbs || computedCrumbs} />
          </Col>
          {title ? (
            <Col
              {...colSizes}
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
          <Col {...colSizes}>{tabsContainer}</Col>
        </Row>
      </Col>{' '}
      {isLoading ? (
        <Col span={24}>
          <Row justify='center'>
            <Spin spinning={isLoading} />
          </Row>
        </Col>
      ) : null}
      <Col
        xs={24}
        lg={16}
        style={{
          padding: '24px 0',
        }}
      >
        {children}
      </Col>
    </Row>
  )
}

PageWrapper.displayName = 'PageWrapper'

export default PageWrapper
