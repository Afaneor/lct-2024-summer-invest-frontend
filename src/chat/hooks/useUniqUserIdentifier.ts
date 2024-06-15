import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

// Функция для генерации уникального идентификатора
const generateUniqueIdentifier = () => {
  const { userAgent } = navigator
  const timestamp = Date.now().toString()
  const rawId = userAgent + timestamp
  const uniqueId = btoa(rawId) // кодирование в base64
  return uniqueId
}

const cookieName = 'GENERATE-USER-ID'
// React хук для работы с уникальным идентификатором сессии
const useSessionId = () => {
  const [sessionId, setSessionId] = useState('')

  useEffect(() => {
    const existingSessionId = Cookies.get(cookieName)
    if (existingSessionId) {
      setSessionId(existingSessionId)
    } else {
      const newSessionId = generateUniqueIdentifier()
      Cookies.set(cookieName, newSessionId, {
        path: '/',
        secure: false,
        sameSite: 'lax',
      })
      setSessionId(newSessionId)
    }
  }, [])

  return sessionId
}

export default useSessionId
