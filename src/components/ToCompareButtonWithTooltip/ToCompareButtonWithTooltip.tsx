import { SwapOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

import { Links } from '@/components/Header/Links'

const ToCompareButtonWithTooltip: React.FC = () => {
  return (
    <Link
      href={`${Links?.MY_CABINET?.href}${Links?.PROFILE?.href}/${Links.COMPARE.href}`}
    >
      <Button icon={<SwapOutlined />} type='text'>
        Сравнения
      </Button>
    </Link>
  )
}

export default ToCompareButtonWithTooltip
