import { Card, Form, Spin } from 'antd'
import React from 'react'

import { useCreateItem, useExtraActionsGet } from '../../services/base/hooks'
import type { FCC } from '../../types'
import { BebasNeueTitle } from '../components/BebasNeueTitle'
import { InputMessageContainer } from '../components/InputMessageContainer'
import { Message } from '../components/Message'
import { useScrollIntoView } from '../hooks/useScrollIntoView'
import useSessionId from '../hooks/useUniqUserIdentifier'
import type { MessageModelProps, NewMessageModelProps } from '../models/Message'
import { MessageModel, OwnerTypeEnum } from '../models/Message'
import type { SelectionRequestActualProps } from '../models/SelectionRequest'
import { SelectionRequestModel } from '../models/SelectionRequest'
import styles from './style.module.scss'

interface SmartChatProps {
  isOpen?: boolean
}

const bodyStyle = {
  padding: 8,
  height: '100%',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
} as React.CSSProperties

const headStyle = { backgroundColor: '#3A3A3A' } as React.CSSProperties

const selectionRequestModel = SelectionRequestModel
const messageModel = MessageModel

interface SmartChatProps {
  onApplyFilter: (filter?: Record<string, any>) => void
}
export const SmartChat: FCC<SmartChatProps> = ({ onApplyFilter }) => {
  useSessionId()
  const [inputMessageForm] = Form.useForm()

  const {
    data: selectionRequestData,
    isLoading: isLoadingActual,
    refetch: refetchActual,
  }: {
    data: Record<'data', SelectionRequestActualProps> | any
    isLoading: boolean
    refetch: () => void
  } = useExtraActionsGet({
    qKey: 'currentScanDates',
    extraUrl: selectionRequestModel.actualUrl(),
  })

  const { mutate: createMessage, isLoading: isLoadingCreateNewMessage } =
    useCreateItem(messageModel)

  const handleCreateMessage = (text: string) => {
    const msg: NewMessageModelProps = {
      text,
      owner_type: OwnerTypeEnum.USER,
      selection_request: selectionRequestData?.data?.id,
    }
    createMessage(msg, {
      onSuccess: () => {
        refetchActual()
        inputMessageForm.resetFields()
      },
      onError: (error: any) => {
        refetchActual()
        console.error('error', error)
      },
    })
  }
  const messagesEndRef = useScrollIntoView([selectionRequestData])

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
      styles={{
        header: headStyle,
        body: bodyStyle,
      }}
      actions={[
        <div key='infoMsg' className={styles.cardFooter}>
          <InputMessageContainer
            form={inputMessageForm}
            isLoading={isLoadingCreateNewMessage}
            isDisabled={isLoadingCreateNewMessage}
            onSend={handleCreateMessage}
          />
        </div>,
      ]}
    >
      <div>
        <Spin spinning={isLoadingActual} />
        <Message
          key={new Date().toISOString()}
          id={new Date().toISOString()}
          text='Привет! Чем могу помочь?'
          created_at={new Date().toISOString()}
          owner_type={OwnerTypeEnum.BOT}
        />
        {selectionRequestData?.data?.messages?.map(
          (item: MessageModelProps) => (
            <Message
              key={item.id}
              id={item.id}
              text={item.text}
              hasFilter={item.filter !== null}
              created_at={item.created_at}
              owner_type={item.owner_type}
              onApplyFilter={() => {
                onApplyFilter(item.filter)
              }}
            />
          )
        )}
        {isLoadingCreateNewMessage ? (
          <Message
            isLoading
            id='loading-id'
            text='Подготавливаю ответ...'
            owner_type={OwnerTypeEnum.BOT}
          />
        ) : null}
        <div ref={messagesEndRef} />
      </div>
    </Card>
  )
}

SmartChat.displayName = 'SmartChat'

export default SmartChat
