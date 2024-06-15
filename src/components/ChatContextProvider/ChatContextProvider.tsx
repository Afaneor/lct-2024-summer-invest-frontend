import React, { useMemo } from 'react'

import { useFilter } from '@/hooks/useFilter'

// Создаем контекст с начальным значением
export const ChatContext = React.createContext(
  {} as { filter: Record<string, any>; setChatFilter: (x: any) => void }
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
  const [filter, setFilter] = useFilter(defaultFilters)
  const setChatFilter = (newFilter: any) => {
    setFilter(newFilter)
  }

  const value = useMemo(
    () => ({ filter, setChatFilter }),
    [filter, setChatFilter]
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

ChatContextProvider.displayName = 'ChatContextProvider'

export default ChatContextProvider
