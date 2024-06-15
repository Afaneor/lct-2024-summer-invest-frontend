import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Card, Col, Dropdown, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import React, { useCallback } from 'react'

import { Links } from '@/components/Header/Links'
import { IconAsButton } from '@/components/IconAsButton'
import type { UsersModelProps } from '@/models'
import { useLogout } from '@/services/auth/hooks'

import ToCompareButtonWithTooltip from '../ToCompareButtonWithTooltip/ToCompareButtonWithTooltip'
import styles from './CurrentUser.module.scss'

const { Text } = Typography

interface CurrentUserProps {
  currentUser: UsersModelProps
}

const UserName = ({ currentUser }: { currentUser: UsersModelProps }) => (
  <Text>{currentUser?.email || currentUser?.username}</Text>
)

export const CurrentUser: React.FC<CurrentUserProps> = ({ currentUser }) => {
  const { mutate: logout }: any = useLogout()

  const handleLogout = () => {
    logout(
      {},
      {
        onSuccess: () => {
          window.location.reload()
        },
      }
    )
  }

  const DropdownRender = useCallback(
    () => (
      <Card>
        <Space direction='vertical'>
          <Link
            href={`${Links?.MY_CABINET?.href}${Links?.PROFILE?.href}${Links?.INFO?.href}`}
          >
            <Button type='text' icon={<UserOutlined />}>
              Профиль
            </Button>
          </Link>

          <ToCompareButtonWithTooltip />
          <Button
            type='text'
            icon={<LogoutOutlined />}
            onClick={(e) => {
              e.stopPropagation()
              handleLogout()
            }}
          >
            Выйти
          </Button>
        </Space>
      </Card>
    ),
    []
  )
  return (
    <Row>
      <Col xs={0} md={24}>
        <Dropdown
          placement='bottom'
          trigger={['click']}
          dropdownRender={DropdownRender}
        >
          <Space
            className={styles.spaceRow}
            direction='horizontal'
            onClick={(e) => e.stopPropagation()}
          >
            <IconAsButton
              icon={UserOutlined}
              style={{
                fontSize: 16,
              }}
            />
            <UserName currentUser={currentUser} />
          </Space>
        </Dropdown>
      </Col>
      <Col md={0}>
        <Dropdown
          placement='bottom'
          trigger={['click']}
          dropdownRender={DropdownRender}
        >
          <Button
            shape='circle'
            icon={<UserOutlined />}
            onClick={(e) => e.stopPropagation()}
          />
        </Dropdown>
      </Col>
    </Row>
  )
}

CurrentUser.displayName = 'CurrentUser'

export default CurrentUser
