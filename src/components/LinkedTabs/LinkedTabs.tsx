import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import type { LinkProps } from '@/components/Header/Links'

import styles from './LinkedTabs.module.scss'

interface LinkedTabsProps {
  linkedTabs: LinkProps[]
}

const LinkedTabs: FCC<LinkedTabsProps> = ({ linkedTabs }) => {
  const router = useRouter()

  return linkedTabs.length ? (
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
  ) : null
}

LinkedTabs.displayName = 'LinkedTabs'

export default LinkedTabs
