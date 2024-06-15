import {
  CloseCircleOutlined,
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Alert, Button, Card, Col, Row, Space, Tooltip } from 'antd'
import React, { useState } from 'react'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { ConfirmModal } from '@/components/ConfirmModal'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { ModalSubscription } from '@/components/ModalSubscription'
import { useFilter } from '@/hooks/useFilter'
import type { SubscriptionModelProps } from '@/models/Subscription'
import { SubscriptionModel } from '@/models/Subscription'
import withAuth from '@/pages/HOC'
import { useDeleteItem } from '@/services/base/hooks'
import MyProfileLayout from '@/templates/MyProfileLayout'
import type { ModelOptionProps } from '@/types'

const Model = SubscriptionModel
const Subscriptions = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const [requestFilter] = useFilter()

  const {
    mutate: deleteItem,
    isLoading: isLoadingDeleteItem,
  }: {
    mutate: any
    isLoading: boolean
  } = useDeleteItem(Model)

  const handleDelete = (id: string | number, refetch: () => void) => {
    deleteItem(id, {
      onSuccess: () => {
        setOpenConfirmModal(false)
        refetch()
      },
    })
  }

  return (
    <MyProfileLayout>
      <FetchMoreItemsComponent
        model={Model}
        defFilters={requestFilter}
        renderItems={({ data, refetch }) => (
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Space direction='vertical'>
                <BebasNeueTitle
                  level={3}
                  title='Вы можете отслеживать изменения с помощью подписок. '
                />
                <BebasNeueTitle
                  level={3}
                  title='Будьте всегда в курсе новых событий, получая уведомления на почту или в телеграм!'
                />
                <ButtonPrimaryRed
                  size='large'
                  onClick={() => setOpenModal((prev) => !prev)}
                >
                  Добавить подписку
                </ButtonPrimaryRed>
              </Space>
            </Col>
            <ModalSubscription
              open={openModal}
              onCancel={() => {
                refetch()
                setOpenModal((prev) => !prev)
              }}
            />
            {data?.length === 0 ? (
              <Col span={24}>
                <Alert message='У вас еще нет подписок' type='info' showIcon />
              </Col>
            ) : (
              data?.map((item: ModelOptionProps<SubscriptionModelProps>) => (
                <Col xs={24} md={6} key={item.id.value}>
                  <ConfirmModal
                    open={openConfirmModal}
                    onConfirm={() => handleDelete(item.id.value, refetch)}
                    onCancel={() => setOpenConfirmModal(false)}
                  />
                  <Card
                    loading={isLoadingDeleteItem}
                    style={{
                      height: '100%',
                    }}
                    title={item.subscription_type.value}
                    extra={[
                      <Tooltip title='Удалить подписку' key={item.id.value}>
                        <Button
                          type='text'
                          shape='circle'
                          icon={<CloseCircleOutlined />}
                          onClick={() => setOpenConfirmModal(true)}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <Space direction='vertical'>
                      {item?.email.value ? (
                        <Space>
                          <MailOutlined />
                          {item.email?.value}
                        </Space>
                      ) : null}
                      {item?.telegram_username.value ? (
                        <Space>
                          <SendOutlined rotate={315} />
                          {item.telegram_username.value}
                        </Space>
                      ) : null}
                    </Space>
                  </Card>
                </Col>
              ))
            )}
          </Row>
        )}
      />
    </MyProfileLayout>
  )
}

export default withAuth(Subscriptions)
