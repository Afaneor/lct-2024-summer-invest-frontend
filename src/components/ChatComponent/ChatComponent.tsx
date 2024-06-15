import clsx from 'clsx'
import React, { useContext } from 'react'
import type { FCC } from 'src/types'

import { SmartChat } from '@/chat/SmartChat'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { MainChatBtn } from '@/components/MainChatBtn'

import styles from './ChatComponent.module.scss'

interface ChatComponentProps {
  prop?: any
}

const ChatComponent: FCC<ChatComponentProps> = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const { setNewFilter } = useContext(ChatContext)

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <MainChatBtn onClick={() => setIsOpen(!isOpen)} isActive={isOpen} />
      </div>
      {isOpen ? (
        <div className={clsx(styles.container, isOpen && styles.show)}>
          <SmartChat onApplyFilter={setNewFilter} />
        </div>
      ) : null}
    </>
  )
}

ChatComponent.displayName = 'ChatComponent'

export default ChatComponent
