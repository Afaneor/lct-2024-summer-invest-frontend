import { SwapOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'

interface CompareButtonProps {
  itemId: string | number
  entityType: string
}

const CompareButton: React.FC<CompareButtonProps> = ({
  itemId,
  entityType,
}) => {
  const [isInComparison, setIsInComparison] = useState(false)

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

  return (
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
  )
}

export default CompareButton
