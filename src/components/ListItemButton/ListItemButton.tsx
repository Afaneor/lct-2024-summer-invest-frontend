import { RightOutlined } from '@ant-design/icons'
import { List } from 'antd'
import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './ListItemButton.module.scss'

interface ListItemProps {
  isActive?: boolean
  children: React.ReactNode
  onClick?: () => void
}
const ListItemButton: FCC<ListItemProps> = ({
  children,
  onClick,
  isActive,
}) => {
  return (
    <List.Item
      className={clsx(styles.container, isActive && styles.active)}
      onClick={onClick}
    >
      {children}
      <RightOutlined />
    </List.Item>
  )
}

ListItemButton.displayName = 'ListItemButton'

export default ListItemButton
