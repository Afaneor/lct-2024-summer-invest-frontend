import { Card, Col, Divider, Form, Row, Select, Space } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { ButtonRounded } from '@/components/ButtonRounded'
import { OkvedSelectModal } from '@/components/OkvedSelectModal'
import type { SupportModelProps } from '@/models'
import { SupportModel } from '@/models'
import { useExtraActionsGet } from '@/services/base/hooks'

interface SupportFiltersCardProps {
  support_type?: string
  support_level?: string
  msp_roster?: string
  economic_activity_name?: string
  economic_activity_code?: string[]
  onChange?: (obj: Record<string, string>) => void
  onReset?: () => void
}

const Model = SupportModel

const SupportFiltersCard: FCC<SupportFiltersCardProps> = ({
  onChange,
  msp_roster,
  support_level,
  support_type,
  economic_activity_name,
  economic_activity_code,
}) => {
  const [form] = Form.useForm()
  const {
    data,
  }: {
    data: Record<'data', SupportModelProps[]> | any
  } = useExtraActionsGet({
    qKey: 'supports',
    extraUrl: Model.dataForFiltersUrl(),
  })
  const handleFormChange = (filterObj: Record<string, string>) => {
    onChange?.(filterObj)
  }

  const onChangeMspRoster = (filterObj: Record<string, string>) => {
    onChange?.(filterObj)
  }

  return (
    <Card>
      <Row>
        <Col span={24}>
          <BebasNeueTitle level={4} title='Фильтр' />
        </Col>
        <Divider
          style={{
            margin: '0 0 15px 0',
          }}
        />
        <Col span={24}>
          <Form
            form={form}
            initialValues={{
              support_type,
              support_level,
              msp_roster,
              economic_activity_name,
              economic_activity_code,
            }}
            onValuesChange={handleFormChange}
            layout='vertical'
          >
            <Form.Item name='support_type' label='Тип поддержки'>
              <Select
                value={support_type}
                mode='multiple'
                size='large'
                placeholder='Выберите тип поддержки'
                aria-multiline
                allowClear
              >
                {data?.data?.support_type?.map((type: string) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='support_level' label='Уровень поддержки'>
              <Select
                value={support_level}
                mode='multiple'
                size='large'
                placeholder='Выберите уровень поддержки'
                allowClear
              >
                {data?.data?.support_level?.map((level: string) => (
                  <Select.Option key={level} value={level}>
                    {level}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='msp_roster' label='Реестр МСП'>
              <Space direction='horizontal'>
                {data?.data?.msp_roster?.map((roster: string) => (
                  <ButtonRounded
                    danger={roster === msp_roster}
                    key={roster}
                    onClick={() => {
                      onChangeMspRoster({
                        msp_roster: roster !== msp_roster ? roster : '',
                      })
                    }}
                  >
                    {roster}
                  </ButtonRounded>
                ))}
              </Space>
            </Form.Item>

            <Form.Item
              name='economic_activity_name'
              label='Экономическая деятельность'
            >
              <Select
                value={economic_activity_name}
                mode='multiple'
                placeholder='Выберите экономическую деятельность'
                allowClear
                size='large'
              >
                {data?.data?.economic_activity_name?.map((name: string) => (
                  <Select.Option key={name} value={name}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='economic_activity_code' label='ОКВЭД'>
              <OkvedSelectModal value={data?.data?.economic_activity_code} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

SupportFiltersCard.displayName = 'SupportFiltersCard'

export default SupportFiltersCard
