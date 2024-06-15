import { SwapOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const ToCompareButtonWithTooltip: React.FC = () => {
  return (
    <Link href='/my-cabinet/profile/compare/'>
      <Button icon={<SwapOutlined />} type='text'>
        Сравнения
      </Button>
    </Link>
  )
}

export default ToCompareButtonWithTooltip
