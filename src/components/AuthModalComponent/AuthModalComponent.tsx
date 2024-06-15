import { Modal } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import AuthCardComponent from '../AuthCardComponent/AuthCardComponent'

interface AuthModalComponentProps {
  open: boolean
  onCLose: () => void
}

const AuthModalComponent: FCC<AuthModalComponentProps> = ({
  open,
  onCLose,
}) => {
  return (
    <Modal open={open} footer={null} onCancel={onCLose}>
      <AuthCardComponent />
    </Modal>
  )
}

AuthModalComponent.displayName = 'AuthModalComponent'

export default AuthModalComponent
