import { SwapOutlined, UserSwitchOutlined } from '@ant-design/icons'
import { Button, Space, Tooltip } from 'antd'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'
import { Links } from '@/components/Header/Links'

interface CompareButtonProps {
  itemId: string | number
  entityType: string
}

const CompareButton: React.FC<CompareButtonProps> = ({
  itemId,
  entityType,
}) => {
  const [isInComparison, setIsInComparison] = useState(false)
  const { currentUser } = useContext(CurrentUserContext)
  const handleClick = () => {
    const itemsToCompare: any[] = JSON.parse(
      localStorage.getItem(entityType) || '[]'
    )
    const index = itemsToCompare.indexOf(itemId)

    if (index !== -1) {
      // Item is already in the array, remove it
      itemsToCompare.splice(index, 1)
      setIsInComparison(false)
    } else {
      // Item is not in the array, add it
      itemsToCompare.push(itemId)
      setIsInComparison(true)
    }

    localStorage.setItem(entityType, JSON.stringify(itemsToCompare))
  }

  const checkItemsToCompare = () => {
    const itemsToCompare: any[] =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem(entityType) || '[]')
        : []
    setIsInComparison(itemsToCompare.indexOf(itemId) !== -1)
  }

  useEffect(() => {
    checkItemsToCompare()
  }, [itemId])

  if (!currentUser) {
    return (
      <Tooltip
        title='Будет доступно после регистрации и авторизации'
        placement='top'
      >
        <Button
          disabled
          style={{
            borderRadius: '50px',
          }}
          icon={<SwapOutlined />}
          danger={isInComparison}
        >
          Сравнить
        </Button>
      </Tooltip>
    )
  }

  return (
    <Space>
      <Tooltip
        title={isInComparison ? 'Убрать из сравнения' : 'Добавить в сравнение'}
      >
        <Button
          icon={<SwapOutlined />}
          onClick={(e) => {
            e.preventDefault()
            handleClick()
          }}
          danger={isInComparison}
        >
          {isInComparison ? 'В сравнении' : 'Сравнить'}
        </Button>
      </Tooltip>
      {isInComparison ? (
        <Link
          href={`${Links?.MY_CABINET?.href}${Links?.PROFILE?.href}${Links.COMPARE.href}`}
        >
          <Tooltip title='Перейти к сравнению'>
            <Button icon={<UserSwitchOutlined />} />
          </Tooltip>
        </Link>
      ) : null}
    </Space>
  )
}

export default CompareButton
