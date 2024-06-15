import { SaveOutlined, SendOutlined } from '@ant-design/icons'
import type { FormInstance } from 'antd'
import { Button, Col, Form, Input, Row, Tooltip } from 'antd'
import React, { useEffect } from 'react'

import type { FCC } from '../../types'

const { TextArea } = Input

interface InputMessageContainerProps {
  isDisabled?: boolean
  isLoading?: boolean
  isSaving?: boolean
  form: FormInstance
  onSend: (message: string) => void
  onSaveRequest?: () => void
}
export const InputMessageContainer: FCC<InputMessageContainerProps> = ({
  onSend,
  isDisabled,
  form,
  isLoading,
  isSaving,
  onSaveRequest,
}) => {
  const inputRef = React.useRef<any>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus() // Устанавливаем фокус на поле ввода
    }
  }, [isDisabled])

  const handleSendClick = () => {
    form.validateFields().then((values) => {
      onSend(values.message)
    })
  }

  return (
    <Form
      form={form}
      layout='horizontal'
      disabled={isDisabled}
      onFinish={handleSendClick}
    >
      <Row justify='space-around' align='middle' style={{ marginTop: 8 }}>
        <Col span={3}>
          <Form.Item name='file'>
            <Tooltip title='Сохранить запрос и начать новый' placement='top'>
              <Button
                loading={isSaving}
                type='text'
                shape='circle'
                size='large'
                icon={<SaveOutlined />}
                onClick={onSaveRequest}
              />
            </Tooltip>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item name='message' required>
            <TextArea
              ref={inputRef}
              autoSize={{ minRows: 1, maxRows: 3 }}
              // style={{ borderRadius: 50 }}
              autoFocus
              placeholder='Введите сообщение'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.metaKey) {
                  // Если нажата клавиша Enter с Cmd
                  e.preventDefault() // Предотвращаем отправку формы
                  const { value, selectionStart, selectionEnd } =
                    e.target as HTMLTextAreaElement
                  const newValue = `${value.substring(
                    0,
                    selectionStart
                  )}\n${value.substring(selectionEnd)}`
                  form.setFieldsValue({ message: newValue }) // Устанавливаем новое значение с символом новой строки
                  setTimeout(() => {
                    ;(e.target as HTMLTextAreaElement).selectionStart =
                      selectionStart + 1 // Перемещаем курсор на новую строку
                    ;(e.target as HTMLTextAreaElement).selectionEnd =
                      selectionStart + 1
                  }, 0)
                } else if (e.key === 'Enter' && !e.metaKey) {
                  // Если нажата клавиша Enter без Cmd
                  e.preventDefault() // Предотвращаем переход на новую строку
                  handleSendClick() // Отправляем сообщение
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                loading={isLoading}
                type='text'
                size='large'
                disabled={!form.getFieldValue('message') || isDisabled}
                htmlType='submit'
                icon={<SendOutlined />}
              />
            )}
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default InputMessageContainer
