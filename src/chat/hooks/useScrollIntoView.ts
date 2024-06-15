import { useEffect, useRef } from 'react'

export const useScrollIntoView = (dependencies: any[]) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [...dependencies])

  return messagesEndRef
}
