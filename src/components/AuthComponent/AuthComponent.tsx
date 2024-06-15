import { UserOutlined } from '@ant-design/icons'
import { Button, Space, Spin } from 'antd'
import React, { useContext, useState } from 'react'

import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'
import type { UsersModelProps } from '@/models'
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
  const { currentUser } = useContext(CurrentUserContext)

  if (currentUser) {
    return (
      <CurrentUser
        currentUser={
          {
            username: 'test',
            email: 'test@test.ru',
            first_name: 'test',
            last_name: 'test',
            is_active: true,
            avatar: 'test',
          } as UsersModelProps
        }
      />
    )
  }

  return (
    <Space direction='horizontal'>
      <AuthModalComponent open={open} onCLose={() => setOpen(false)} />
      <Spin spinning={isLoading}>
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
