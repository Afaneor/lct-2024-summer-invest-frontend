import { Card, Col, Divider, Form, Input, Row, Typography } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'

const { Text } = Typography

interface SupportFiltersCardProps {
  prop?: any
}

const SupportFiltersCard: FCC<SupportFiltersCardProps> = () => {
  const handleChangeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value) // здесь вы можете обработать изменение фильтра
  }

  return (
    <Card>
      <Row>
        <Col span={24}>
          <BebasNeueTitle level={4} title='Фильтр' />
        </Col>
        <Divider />
        <Col span={24}>
          <Form>
            <Form.Item>
              <Text>Фильтр 1</Text>
              <Input onChange={handleChangeFilter} />
            </Form.Item>
            <Form.Item>
              <Text>Фильтр 2</Text>
              <Input onChange={handleChangeFilter} />
            </Form.Item>
            <Form.Item>
              <Text>Фильтр 3</Text>
              <Input onChange={handleChangeFilter} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

SupportFiltersCard.displayName = 'SupportFiltersCard'

export default SupportFiltersCard
