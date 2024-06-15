import { FilePdfFilled, PlusOutlined, SaveOutlined } from '@ant-design/icons'
import { Button, Form, Space, Tooltip } from 'antd'
import React from 'react'

import type { FCC } from '../../types'
import styles from './InputButtons.module.scss'

interface InputButtonsProps {
  isLoadingPdf?: boolean
  isAuthUser?: boolean
  isSaving?: boolean
  onSaveRequest?: () => void
  onNewChat?: () => void
  onDownloadPdf?: () => void
}

const InputButtons: FCC<InputButtonsProps> = ({
  isAuthUser,
  isSaving,
  onSaveRequest,
  onNewChat,
  onDownloadPdf,
  isLoadingPdf,
}) => {
  return (
    <Space>
      {isAuthUser ? (
        <>
          <Form.Item name='save'>
            <Tooltip title='Сохранить запрос и начать новый' placement='top'>
              <Button
                loading={isSaving}
                type='text'
                size='large'
                icon={<SaveOutlined className={styles.btnIcon} />}
                onClick={onSaveRequest}
              />
            </Tooltip>
          </Form.Item>
          <Form.Item name='load_pdf'>
            <Tooltip title='Скачать PDF файл' placement='top'>
              <Button
                loading={isLoadingPdf}
                type='text'
                size='large'
                icon={<FilePdfFilled className={styles.btnIcon} />}
                onClick={onDownloadPdf}
              />
            </Tooltip>
          </Form.Item>
        </>
      ) : (
        <Form.Item name='new_chat'>
          <Tooltip title='Начать новый чат' placement='top'>
            <Button
              loading={isSaving}
              type='text'
              size='large'
              icon={<PlusOutlined className={styles.btnIcon} />}
              onClick={onNewChat}
            />
          </Tooltip>
        </Form.Item>
      )}
    </Space>
  )
}

InputButtons.displayName = 'InputButtons'

export default InputButtons
