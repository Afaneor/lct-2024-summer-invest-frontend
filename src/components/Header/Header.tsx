import { Col, Row } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useMemo } from 'react'

import { AuthComponent } from '@/components/AuthComponent'
import { BebasNeueTitle } from '@/components/BebasNeueTitle'
// eslint-disable-next-line import/extensions
import { BurgerDropdownLinks } from '@/components/BurgerDropdownLinks/BurgerDropdownLinks'
import { useWindowScroll } from '@/hooks/useWindowScroll'
import type { FCC } from '@/types'

import styles from './Header.module.scss'
import { FirstLineLinks, Links } from './Links'

export const Header: FCC = () => {
  const isScrolled = useWindowScroll(50)
  const filteredLInks = useMemo(
    () => Object.values(Links).filter((_l) => _l.isTab),
    [Links]
  )
  return (
    <header
      className={clsx(
        styles.headerContainer,
        isScrolled ? styles.shadowClass : ''
      )}
    >
      <Row
        justify='center'
        style={{
          width: '100%',
        }}
      >
        <Col
          flex='auto'
          xs={0}
          md={0}
          lg={16}
          style={{
            margin: '16px 0 18px',
          }}
        >
          <Row>
            {FirstLineLinks.map((link) => (
              <Link
                key={link.href}
                className={styles.firstLineLink}
                href={link.href}
              >
                {link.title}
              </Link>
            ))}
          </Row>
        </Col>

        <Col xl={0} xs={24}>
          <Row justify='end'>
            <BurgerDropdownLinks links={filteredLInks} />
          </Row>
        </Col>
      </Row>
      <Row justify='center'>
        <Col
          xs={0}
          md={0}
          lg={16}
          style={{
            margin: '25px 0 1px',
          }}
        >
          <div className={styles.secondLineLinksContainer}>
            {filteredLInks.map((link) => (
              <Link key={link.href} className={styles.link} href={link.href}>
                {link.title}
              </Link>
            ))}

            <div className={styles.authIconBtn}>
              <AuthComponent />
            </div>
          </div>
        </Col>
        <Col xs={0} md={0} lg={16}>
          <BebasNeueTitle
            title='Умный инвестиционный портал'
            className={styles.subtitleInvest}
          />
        </Col>
      </Row>
    </header>
  )
}

Header.displayName = 'Header'

export default Header
