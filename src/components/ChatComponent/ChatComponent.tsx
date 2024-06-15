import clsx from 'clsx'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import type { FCC } from 'src/types'

import type { EntityTypeEnum } from '@/chat/models/Message'
import { EntityKeyEnum } from '@/chat/models/Message'
import { SmartChat } from '@/chat/SmartChat'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { Links } from '@/components/Header/Links'
import { MainChatBtn } from '@/components/MainChatBtn'

import styles from './ChatComponent.module.scss'

interface ChatComponentProps {
  prop?: any
}

const ChatComponent: FCC<ChatComponentProps> = () => {
  const { setNewFilter, setIsOpen, isOpen, filter } = useContext(ChatContext)
  const router = useRouter()
  const handleApplyFilter = (
    key: keyof typeof EntityTypeEnum,
    newFilter?: Record<string, any>
  ) => {
    let url = '/'
    switch (key) {
      case EntityKeyEnum.service_support:
        url = Links.SUPPORTS.href
        break
      case EntityKeyEnum.investment_object:
        url = Links.SMART_ASSISTANT.href
        break
      case EntityKeyEnum.category_problem:
        url = Links.FAQ.href
        break
      default:
        break
    }
    setNewFilter({
      ...filter,
      [key]: newFilter,
    })
    router.push(url)
  }
  return (
    <>
      <div className={styles.mainBtn}>
        <MainChatBtn onClick={() => setIsOpen(!isOpen)} isActive={isOpen} />
      </div>
      {isOpen ? (
        <div className={clsx(styles.container, isOpen && styles.show)}>
          <SmartChat onApplyFilter={handleApplyFilter} />
        </div>
      ) : null}
    </>
  )
}

ChatComponent.displayName = 'ChatComponent'

export default ChatComponent
