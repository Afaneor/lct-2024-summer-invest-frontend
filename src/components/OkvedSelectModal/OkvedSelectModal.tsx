import { Button } from 'antd'
import React, { useState } from 'react'
import type { FCC } from 'src/types'

import { ModalWrapper } from '@/components/ModalWrapper'
import { OkvedSelector } from '@/components/OkvedSelector'

interface OkvedSelectModalProps {
  value?: string[]
  onChange?: (checkedKeys: React.Key[]) => void
}

const OkvedSelectModal: FCC<OkvedSelectModalProps> = ({ onChange, value }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [checkedKeys, setCheckedKeys] = useState(value as React.Key[])
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    onChange?.(checkedKeys)
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setCheckedKeys([])
  }

  const handleSetCheckedKeys = (keys: React.Key[] | any) => {
    setCheckedKeys(keys)
  }

  return (
    <>
      <Button block onClick={showModal}>
        {value?.length
          ? `Выбрано: ${value?.length} `
          : 'Выбрать из справочника'}
      </Button>
      <ModalWrapper
        open={isModalVisible}
        cancelText='Очистить'
        okText='Сохранить выбор'
        onOk={handleOk}
        onCancel={handleCancel}
        onClose={() => {
          setIsModalVisible(false)
        }}
      >
        <OkvedSelector value={checkedKeys} onCheck={handleSetCheckedKeys} />
      </ModalWrapper>
    </>
  )
}

OkvedSelectModal.displayName = 'OkvedSelectModal'

export default OkvedSelectModal
