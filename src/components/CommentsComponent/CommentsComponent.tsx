import { Avatar, Col, Form, Input, List, notification, Row, Space } from 'antd'
import React, { useState } from 'react'
import type { FCC, ModelOptionProps } from 'src/types'

import { useDateTimePrettyStr } from '@/chat/hooks/useDateTimePrettyStr'
import { ButtonRounded } from '@/components/ButtonRounded'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { useRefetchInvalidateQuery } from '@/hooks/useRefetchInvalidateQuery'
import type { CommentModelProps } from '@/models/Comment'
import { CommentModel } from '@/models/Comment'
import { useCreateItem } from '@/services/base/hooks'

const { TextArea } = Input
interface CommentsComponentProps {
  object_id?: string | number | string[]
  content_type?: number
}

const Model = CommentModel

const CommentsComponent: FCC<CommentsComponentProps> = ({
  object_id,
  content_type,
}) => {
  const { refetch } = useRefetchInvalidateQuery()

  const [showCommentBtn, setShowCommentBtn] = useState(false)
  const { mutate: createItem, isLoading: isLoadingCreateItem } =
    useCreateItem(CommentModel)
  const [form] = Form.useForm()

  const resetForm = () => {
    form.resetFields()
    setShowCommentBtn(false)
  }
  const handleCreateItem = (values: Record<string, any>) => {
    const newValues = { ...values, object_id, content_type }
    createItem(newValues, {
      onSuccess: () => {
        resetForm()
        notification.success({
          message: 'Комментарий успешно добавлен',
        })
        refetch('commentsInfinity')
      },
      onError: (error) => {
        notification.error({
          message: 'Ошибка при добавлении комментария',
        })
        console.error('error', error)
      },
    })
  }
  const { dateFormatter } = useDateTimePrettyStr()
  return (
    <>
      <Row>
        <Col span={24}>
          <Form form={form} name='comment_form' onFinish={handleCreateItem}>
            <Form.Item
              name='text'
              rules={[{ required: true, message: 'Введите комментарий' }]}
            >
              <TextArea
                placeholder='Введите комментарий'
                autoSize={{ minRows: 2, maxRows: 4 }}
                onClick={() => {
                  setShowCommentBtn(true)
                }}
              />
            </Form.Item>
            {showCommentBtn ? (
              <Row justify='end'>
                <Space direction='horizontal'>
                  <Form.Item>
                    <ButtonRounded type='text' onClick={resetForm}>
                      Отмена
                    </ButtonRounded>
                  </Form.Item>
                  <Form.Item shouldUpdate>
                    {() => (
                      <ButtonRounded
                        loading={isLoadingCreateItem}
                        type='primary'
                        htmlType='submit'
                        disabled={!form.getFieldsValue().text}
                      >
                        Оставить комментарий
                      </ButtonRounded>
                    )}
                  </Form.Item>
                </Space>
              </Row>
            ) : null}
          </Form>
        </Col>
      </Row>
      <FetchMoreItemsComponent
        model={Model}
        defFilters={{ object_id, content_type }}
        renderItems={(fetchedValues) => (
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <List
                itemLayout='vertical'
                dataSource={fetchedValues}
                renderItem={(item: ModelOptionProps<CommentModelProps>) => (
                  <List.Item key={item.id.value}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                      }
                      title={
                        <a href='item.href'>{item.user?.value?.username}</a>
                      }
                      description={
                        item.created_at?.value
                          ? `${dateFormatter({ date: item.created_at.value })}`
                          : null
                      }
                    />
                    {item.text.value}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        )}
      />
    </>
  )
}

CommentsComponent.displayName = 'CommentsComponent'

export default CommentsComponent
