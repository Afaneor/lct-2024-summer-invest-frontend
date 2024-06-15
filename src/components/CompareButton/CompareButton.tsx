import { SwapOutlined } from '@ant-design/icons'
import { Button, Tooltip } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface CompareButtonProps {
  item: any // replace 'any' with the type of your item
}

const CompareButton: React.FC<CompareButtonProps> = ({ item }) => {
  const [isInComparison, setIsInComparison] = useState(false)

  const handleClick = () => {
    const itemsToCompare: any[] = JSON.parse(
      localStorage.getItem('itemsToCompare') || '[]'
    )
    const index = itemsToCompare.findIndex((i) => i.id === item.id)

    if (index !== -1) {
      // Item is already in the array, remove it
      itemsToCompare.splice(index, 1)
      setIsInComparison(false)
    } else {
      // Item is not in the array, add it
      itemsToCompare.push(item)
      setIsInComparison(true)
    }

    localStorage.setItem('itemsToCompare', JSON.stringify(itemsToCompare))
  }

  const checkItemsToCompare = () => {
    const itemsToCompare: any[] =
      typeof window !== 'undefined'
        ? JSON.parse(localStorage.getItem('itemsToCompare') || '[]')
        : []
    setIsInComparison(itemsToCompare.some((i) => i.id === item?.id))
  }

  useEffect(() => {
    checkItemsToCompare()
  }, [item])

  return (
    <>
      <Tooltip
        title={isInComparison ? 'Убрать из сравнения' : 'Добавить в сравнение'}
      >
        <Button
          icon={<SwapOutlined />}
          onClick={handleClick}
          danger={isInComparison}
        />
      </Tooltip>
      {isInComparison ? (
        <Link href='/my-cabinet/profile/compare/'>
          <Button type='text'>Сравнить</Button>
        </Link>
      ) : null}
    </>
  )
}

export default CompareButton
