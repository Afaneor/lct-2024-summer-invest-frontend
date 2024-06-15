import type { ModalProps } from 'antd'
import { Form, Input, Modal, Select } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/chat/components/BebasNeueTitle'
import type {
  SubscriptionDataForFilterProps,
  SubscriptionModelProps,
} from '@/models/Subscription'
import { SubscriptionModel } from '@/models/Subscription'
import { useCreateItem, useExtraActionsGet } from '@/services/base/hooks'

import styles from './ModalSubscription.module.scss'

interface ModalSubscriptionProps extends ModalProps {
  open: boolean
  onCancel: () => void
}

const Model = SubscriptionModel

const ModalSubscription: FCC<ModalSubscriptionProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const {
    data,
  }: {
    data:
      | Record<
          'data',
          Record<'subscription_type', SubscriptionDataForFilterProps>
        >
      | any
  } = useExtraActionsGet({
    qKey: 'subscriptionsFilterData',
    extraUrl: Model.dataForFiltersUrl(),
  })

  const { mutate: createItem, isLoading } = useCreateItem(Model)
  const handleCreate = (values: SubscriptionModelProps) => {
    createItem(values, {
      onSuccess: () => {
        form.resetFields()
        onCancel()
      },
    })
  }

  const handleFinish = () => {
    form.validateFields().then((values) => {
      handleCreate(values as SubscriptionModelProps)
    })
  }
  return (
    <Modal
      loading={isLoading}
      open={open}
      okText='Подписаться'
      cancelText='Отмена'
      okButtonProps={{
        className: styles.modalButton,
      }}
      onOk={handleFinish}
      onCancel={onCancel}
    >
      <BebasNeueTitle level={3} title='Оформление подписки' />
      <Form form={form} layout='vertical' name='basic'>
        <Form.Item
          label='Выберите тип подписки'
          name='subscription_type'
          rules={[
            {
              required: true,
              message: 'Пожалуйста, выберите тип подписки',
            },
          ]}
        >
          <Select size='large' placeholder='Выберите тип подписки'>
            {Object.entries(data?.data.subscription_type || {}).map(
              ([k, v]: any) => (
                <Select.Option key={k} value={k}>
                  {v}
                </Select.Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item
          label='Имя пользователя в Telegram'
          name='telegram_username'
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите имя пользователя в Telegram',
            },
          ]}
        >
          <Input
            size='large'
            style={{
              borderRadius: 0,
            }}
            onBlur={(e) => {
              const { value } = e.target
              if (value && value[0] !== '@') {
                form.setFieldsValue({ telegram_username: `@${value}` })
              }
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

ModalSubscription.displayName = 'ModalSubscription'

export default ModalSubscription
