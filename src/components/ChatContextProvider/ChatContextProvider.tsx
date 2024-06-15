import React, { useMemo, useState } from 'react'

import { useFilter } from '@/hooks/useFilter'

// Создаем контекст с начальным значением
export const ChatContext = React.createContext(
  {} as {
    filter: Record<string, any>
    setChatFilter: (rec: Record<string, any>) => void
    setNewFilter: (rec?: Record<string, any>) => void
    setIsOpen: (isOpen: boolean) => void
    setIsOpenWithMessage: (_isOpen: boolean, message: string) => void
    isOpen: boolean
    message?: string
  }
)

interface ChatContextProviderProps {
  children: React.ReactNode
  defaultFilters?: any
}

// Создаем провайдер контекста
const ChatContextProvider: React.FC<ChatContextProviderProps> = ({
  children,
  defaultFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filter, setChatFilter, setNewFilter] = useFilter(defaultFilters)
  const [message, setMessage] = useState('')

  const setIsOpenWithMessage = (show: boolean, msg: string) => {
    setIsOpen(show)
    setMessage(msg)
  }

  const value = useMemo(
    () => ({
      filter,
      setChatFilter,
      setNewFilter,
      setIsOpen,
      isOpen,
      setIsOpenWithMessage,
      message,
    }),
    [filter, setChatFilter]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

ChatContextProvider.displayName = 'ChatContextProvider'

export default ChatContextProvider
