import type { ModalProps } from 'antd'
import { Modal } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import styles from './ConfirmModal.module.scss'

interface ConfirmModalProps extends ModalProps {
  okText?: string
  open: boolean
  onCancel: () => void
  onConfirm: () => void
}

const ConfirmModal: FCC<ConfirmModalProps> = ({
  open,
  okText,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      centered
      open={open}
      title='Вы уверены?'
      okButtonProps={{
        className: styles.confirmButton,
      }}
      okText={okText || 'Да'}
      cancelText='Отмена'
      onOk={onConfirm}
      onCancel={onCancel}
    />
  )
}

ConfirmModal.displayName = 'ConfirmModal'

export default ConfirmModal
