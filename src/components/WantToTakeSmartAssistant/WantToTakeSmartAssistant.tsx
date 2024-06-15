import { MessageOutlined } from '@ant-design/icons'
import React, { useContext } from 'react'
import type { FCC } from 'src/types'

import { AlertWithButton } from '@/components/AlertWithButton'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'

const WantToTakeSmartAssistant: FCC = () => {
  const { setIsOpen, isOpen } = useContext(ChatContext)
  return (
    <AlertWithButton
      alertType='error'
      title='Воспользуйтесь поиском или задайте вопрос умному помощнику'
      buttonIcon={<MessageOutlined />}
      buttonText='Задать вопрос'
      onClick={() => setIsOpen(!isOpen)}
    />
  )
}

WantToTakeSmartAssistant.displayName = 'WantToTakeSmartAssistant'

export default WantToTakeSmartAssistant
