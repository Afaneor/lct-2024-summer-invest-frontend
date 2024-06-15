import { CloseOutlined, MessageOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './style.module.scss'

interface MainChatBtnProps {
  isActive?: boolean
  onClick: () => void
}
export const MainChatBtn: FCC<MainChatBtnProps> = ({ isActive, onClick }) => {
  return (
    <Button
      type='primary'
      className={styles.btnContainer}
      size='large'
      shape='circle'
      icon={!isActive ? <MessageOutlined /> : <CloseOutlined />}
      onClick={onClick}
    />
  )
}

MainChatBtn.displayName = 'MainChatBtn'

export default MainChatBtn
