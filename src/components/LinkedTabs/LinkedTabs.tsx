import { MenuOutlined } from '@ant-design/icons'
import { Button, Dropdown, type MenuProps } from 'antd'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import type { LinkProps } from '@/components/Header/Links'

import styles from './LinkedTabs.module.scss'

interface LinkedTabsProps {
  linkedTabs: LinkProps[]
}

const LinkedTabs: FCC<LinkedTabsProps> = ({ linkedTabs }) => {
  const router = useRouter()

  const items: MenuProps['items'] = useMemo(() => {
    return linkedTabs?.map((link) => ({
      label: (
        <Link href={link.href}>
          <Button type='link'>
            <BebasNeueTitle level={5} title={link.title} />
          </Button>
        </Link>
      ),
      key: link.href,
    }))
  }, [])

  if (!linkedTabs.length) return null

  return (
    <>
      <div className={styles.tabsContainer}>
        {linkedTabs.map((tab) => {
          const isActive = router.pathname === tab.href
          return (
            <Link
              className={clsx(styles.tabLink, isActive ? styles.active : '')}
              key={tab.href}
              href={tab.href}
              replace
            >
              <BebasNeueTitle
                level={3}
                style={{
                  color: isActive ? '#ef0f33' : '',
                }}
                title={tab.title}
              />
            </Link>
          )
        })}
      </div>
      <div className={styles.burgerTabsContainer}>
        <Dropdown
          menu={{ items }}
          trigger={['click']}
          dropdownRender={undefined}
        >
          <Button
            shape='circle'
            type='text'
            icon={<MenuOutlined />}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      </div>
    </>
  )
}

LinkedTabs.displayName = 'LinkedTabs'

export default LinkedTabs
