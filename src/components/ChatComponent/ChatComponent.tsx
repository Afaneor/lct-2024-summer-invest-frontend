import clsx from 'clsx'
import React from 'react'
import type { FCC } from 'src/types'

import { SmartChat } from '@/chat/SmartChat'
import { MainChatBtn } from '@/components/MainChatBtn'

import styles from './ChatComponent.module.scss'

interface ChatComponentProps {
  prop?: any
}

const ChatComponent: FCC<ChatComponentProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <>
      <MainChatBtn onClick={() => setIsOpen(!isOpen)} isActive={isOpen} />
      {isOpen ? (
        <div className={clsx(styles.container, isOpen && styles.show)}>
          <SmartChat />
        </div>
      ) : null}
    </>
  )
}

ChatComponent.displayName = 'ChatComponent'

export default ChatComponent
