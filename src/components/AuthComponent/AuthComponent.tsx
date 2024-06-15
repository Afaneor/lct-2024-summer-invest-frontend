import { UserOutlined } from '@ant-design/icons'
import { Button, Space, Spin } from 'antd'
import { isEmpty } from 'lodash'
import React, { useContext, useState } from 'react'

import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'
import type { FCC } from '@/types'

import { AuthModalComponent } from '../AuthModalComponent'
import { CurrentUser } from '../CurrentUser'
import { IconAsButton } from '../IconAsButton'

interface AuthComponentProps {
  isLoading?: boolean
  title?: string
}
const AuthComponent: FCC<AuthComponentProps> = ({
  title,
  isLoading = false,
}) => {
  const [open, setOpen] = useState(false)
  const { currentUser, isLoading: isUserLoading } =
    useContext(CurrentUserContext)

  if (!isEmpty(currentUser)) {
    return <CurrentUser currentUser={currentUser} />
  }

  return (
    <Space direction='horizontal'>
      <AuthModalComponent open={open} onCLose={() => setOpen(false)} />
      <Spin spinning={isLoading || isUserLoading}>
        {title ? (
          <Button type='text' onClick={() => setOpen(true)}>
            {title}
          </Button>
        ) : (
          <IconAsButton
            icon={UserOutlined}
            style={{
              fontSize: 16,
            }}
            onClick={() => setOpen(true)}
          />
        )}
      </Spin>
    </Space>
  )
}

AuthComponent.displayName = 'AuthComponent'

export default AuthComponent
