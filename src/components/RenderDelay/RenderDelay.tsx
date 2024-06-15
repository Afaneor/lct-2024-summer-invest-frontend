import React, { useEffect, useState } from 'react'
import type { FCC } from 'src/types'

// @ts-ignore
const RenderDelay: FCC = ({ children }) => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true)
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  return !show ? <span>Загрузка...</span> : children
}

RenderDelay.displayName = 'RenderDelay'

export default RenderDelay
