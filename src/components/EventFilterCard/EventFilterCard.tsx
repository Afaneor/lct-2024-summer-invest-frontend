import { Card, Col, DatePicker, Form, Row } from 'antd'
import dayjs from 'dayjs'
import React from 'react'

interface EventFilterCardProps {
  event_datetime?: string
  onChange: (values: Record<string, any>) => void
}

const EventFilterCard: React.FC<EventFilterCardProps> = ({
  event_datetime,
  onChange,
}) => {
  const [form] = Form.useForm()
  const handleDateChange = (values: Record<string, any>) => {
    onChange({
      ...values,
      event_datetime: values.event_datetime?.format('YYYY-MM-DD HH:mm:ss'),
    })
  }

  return (
    <Card title='Фильтр мероприятий'>
      <Form form={form} layout='vertical' onValuesChange={handleDateChange}>
        <Row>
          <Col span={24}>
            <Form.Item name='event_datetime' label='Дата мероприятия'>
              <DatePicker
                value={event_datetime ? dayjs(event_datetime) : null}
                style={{
                  width: '100%',
                  borderRadius: 0,
                }}
                size='large'
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  )
}

export default EventFilterCard
