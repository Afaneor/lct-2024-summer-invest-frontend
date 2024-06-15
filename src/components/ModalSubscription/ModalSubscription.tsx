import type { ModalProps } from 'antd'
import { Form, Input, Modal, Select } from 'antd'
import React, { useContext } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'
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

const borderRadiusNoneStyle = { borderRadius: 0 }

const Model = SubscriptionModel

const ModalSubscription: FCC<ModalSubscriptionProps> = ({ open, onCancel }) => {
  const [form] = Form.useForm()
  const { currentUser } = useContext(CurrentUserContext)
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
    extraUrl: Model.additionalDataUrl(),
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
      <Form
        form={form}
        initialValues={{
          email: currentUser?.email,
        }}
        layout='vertical'
        name='basic'
      >
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
          label='Электронная почта'
          name='email'
          rules={[
            {
              type: 'email',
              message: 'Введите корректный адрес электронной почты',
            },
            {
              required: true,
              message: 'Пожалуйста, введите адрес электронной почты',
            },
          ]}
        >
          <Input
            style={borderRadiusNoneStyle}
            placeholder='name@example.ru'
            size='large'
          />
        </Form.Item>
        <Form.Item label='Имя пользователя в Telegram' name='telegram_username'>
          <Input
            size='large'
            placeholder='@username'
            style={borderRadiusNoneStyle}
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
