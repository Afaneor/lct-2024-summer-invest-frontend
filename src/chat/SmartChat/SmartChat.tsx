import { Card } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

import type { FCC } from '../../types'
import { BebasNeueTitle } from '../components/BebasNeueTitle'
import { InputMessageContainer } from '../components/InputMessageContainer'
import { Message } from '../components/Message'
import styles from './style.module.scss'

interface SmartChatProps {
  isOpen?: boolean
}

export interface MessageData {
  id: number | string
  text: string
  datetime: string
  type: string
}

const bodyStyle = {
  padding: 8,
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
} as React.CSSProperties

let sayHello = false

const headStyle = { backgroundColor: '#3A3A3A' } as React.CSSProperties

export const SmartChat: FCC<SmartChatProps> = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fakeData, setFakeData] = useState([] as MessageData[])
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [fakeData])

  useEffect(() => {
    if (!sayHello) {
      sayHello = true
      setTimeout(() => {
        setFakeData((prevState) => [
          ...prevState,
          {
            id: `hello-${new Date().getTime()}`,
            text: '## Привет! Чем могу помочь?',
            datetime: new Date().toISOString(),
            type: 'assistant',
          },
        ])
      }, 1000)
    }
  }, [])

  const onAddNewMessage = (text: string) => {
    setFakeData((prevState) => [
      ...prevState,
      {
        id: fakeData.length + 1,
        text,
        datetime: new Date().toISOString(),
        type: 'user',
      },
    ])
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setFakeData((prevState) => [
        ...prevState,
        {
          id: fakeData.length + 2,
          text: 'Вот такой ответ очень длинный и интересный, но не всегда понятный...',
          datetime: new Date().toISOString(),
          type: 'assistant',
        },
      ])
    }, 1000)
  }
  return (
    <Card
      bordered={false}
      title={
        <BebasNeueTitle
          title='Умный помощник'
          level={3}
          style={{
            color: 'white',
          }}
        />
      }
      className={styles.container}
      headStyle={headStyle}
      bodyStyle={bodyStyle}
      actions={[
        <div key='infoMsg' className={styles.cardFooter}>
          <InputMessageContainer
            isDisabled={isLoading}
            onSend={onAddNewMessage}
          />
        </div>,
      ]}
    >
      <div>
        {fakeData.map((item) => (
          <Message
            key={item.id}
            id={item.id}
            text={item.text}
            datetime={item.datetime}
            type={item.type}
          />
        ))}
        {isLoading ? (
          <Message
            isLoading
            id='loading-id'
            text='Подготавливаю ответ...'
            type='assistant'
          />
        ) : null}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  )
}

SmartChat.displayName = 'SmartChat'

export default SmartChat
