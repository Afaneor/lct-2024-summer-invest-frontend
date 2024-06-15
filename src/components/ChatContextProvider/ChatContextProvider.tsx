import React, { useMemo } from 'react'

import { useFilter } from '@/hooks/useFilter'

// Создаем контекст с начальным значением
export const ChatContext = React.createContext(
  {} as {
    filter: Record<string, any>
    setChatFilter: (rec: Record<string, any>) => void
    setNewFilter: (rec?: Record<string, any>) => void
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
  const [filter, setFilter, handleSetNewFilter] = useFilter(defaultFilters)
  const setChatFilter = (newFilter: any) => {
    setFilter(newFilter)
  }

  const setNewFilter = (newFilter: any) => {
    handleSetNewFilter(newFilter)
  }

  const value = useMemo(
    () => ({ filter, setChatFilter, setNewFilter }),
    [filter, setChatFilter]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

ChatContextProvider.displayName = 'ChatContextProvider'

export default ChatContextProvider
