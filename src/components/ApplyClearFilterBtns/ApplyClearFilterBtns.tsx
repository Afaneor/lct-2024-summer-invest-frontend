import { Button, Space } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'

import styles from './style.module.scss'

interface ApplyClearFilterBtnsProps {
  onClear: () => void
  onApply: () => void
  textClearBtn?: string
  textApplyBtn?: string
}
export const ApplyClearFilterBtns: FCC<ApplyClearFilterBtnsProps> = ({
  onApply,
  onClear,
  textApplyBtn,
  textClearBtn,
}) => {
  return (
    <Space className={styles.container}>
      <Button type='link' danger onClick={onClear}>
        {textClearBtn || 'Очистить'}
      </Button>
      <ButtonPrimaryRed type='primary' onClick={onApply}>
        {textApplyBtn || 'Применить'}
      </ButtonPrimaryRed>
    </Space>
  )
}

ApplyClearFilterBtns.displayName = 'ApplyClearFilterBtns'

export default ApplyClearFilterBtns
