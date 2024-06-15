import { Button, Col, Layout, Row } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

// eslint-disable-next-line import/extensions
import { BurgerDropdownLinks } from '@/components/BurgerDropdownLinks/BurgerDropdownLinks'
import { useWindowScroll } from '@/hooks/useWindowScroll'
import type { FCC } from '@/types'

import styles from './Header.module.scss'
import { Links } from './Links'

const { Header: AntdHeader } = Layout

export const Header: FCC = () => {
  const router = useRouter()
  const isScrolled = useWindowScroll(50)
  return (
    <AntdHeader
      className={clsx(
        styles.headerContainer,
        isScrolled ? styles.shadowClass : ''
      )}
    >
      <Row justify='center' style={{ width: '100%' }}>
        <Col flex='auto' xs={0} md={0} lg={16}>
          <Row>
            {Links.map((link) => (
              <div
                key={link.href}
                className={`${
                  router.pathname === link.href || router.asPath === link.href
                    ? styles.activeLink
                    : ''
                } ${styles.navLink}`}
              >
                <Link href={link.href}>
                  <Button
                    color='black'
                    type='link'
                    style={{
                      padding: 0,
                      marginRight: 10,
                    }}
                  >
                    {link.text}
                  </Button>
                </Link>
              </div>
            ))}
          </Row>
        </Col>
        {/* <Col flex='auto' className={styles.authSection}> */}
        {/*  <AuthComponent /> */}
        {/* </Col> */}
        <Col xl={0}>
          <BurgerDropdownLinks />
        </Col>
      </Row>
    </AntdHeader>
  )
}

Header.displayName = 'Header'

export default Header
