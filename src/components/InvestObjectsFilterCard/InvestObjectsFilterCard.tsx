import { Card, Col, Divider, Form, Row, Select, Space } from 'antd'
import React, { useState } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { ButtonRounded } from '@/components/ButtonRounded'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { useExtraActionsGet } from '@/services/base/hooks'

import ButtonPrimaryRed from '../ButtonPrimaryRed/ButtonPrimaryRed'

interface InvestObjectsFilterCardProps {
  economic_activity_name?: string
  preferential_treatment?: string
  transaction_form_name?: string
  transaction_form_type?: string
  location?: string
  site_type?: string
  specialized_site_is_free_customs_zone_regime?: string
  real_estate_maip?: string
  isLoading?: boolean
  onChange?: (obj: Record<string, string>) => void
}

const Model = InvestmentObjectsModel

const InvestObjectsFilterCard: FCC<InvestObjectsFilterCardProps> = ({
  onChange,
  economic_activity_name,
  preferential_treatment,
  transaction_form_name,
  transaction_form_type,
  location,
  site_type,
  isLoading,
}) => {
  const [regimeC, setRegimeC] = useState('')
  const [maipC, setMaipC] = useState('')
  const [form] = Form.useForm()
  const {
    data,
  }: {
    data: Record<'data', any[]> | any
  } = useExtraActionsGet({
    qKey: 'investmentObjects',
    extraUrl: Model.dataForFiltersUrl(),
  })

  const handleSetBtnFilter = (
    k: string,
    v: string,
    c: string,
    callback: (v: string) => void
  ) => {
    form.setFieldsValue({
      [k]: v !== c ? v : '',
    })
    callback(v !== c ? v : '')
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
          <Form form={form} layout='vertical' onFinish={onChange}>
            <Row gutter={[20, 20]}>
              <Col xs={24} md={8}>
                <Form.Item
                  name='economic_activity_name'
                  label='Сфера деятельности'
                >
                  <Select
                    value={economic_activity_name}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите сферу деятельности'
                    allowClear
                  >
                    {data?.data?.economic_activity_name?.map((name: string) => (
                      <Select.Option key={name} value={name}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name='preferential_treatment'
                  label='Преференциальный режим'
                >
                  <Select
                    value={preferential_treatment}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите преференциальный режим'
                    allowClear
                  >
                    {data?.data?.preferential_treatment?.map(
                      (treatment: string) => (
                        <Select.Option key={treatment} value={treatment}>
                          {treatment}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name='transaction_form_name' label='Форма сделки'>
                  <Select
                    value={transaction_form_name}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите форму сделки'
                    allowClear
                  >
                    {data?.data?.transaction_form_name?.map(
                      (formName: string) => (
                        <Select.Option key={formName} value={formName}>
                          {formName}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name='transaction_form_type'
                  label='Тип формы сделки'
                >
                  <Select
                    value={transaction_form_type}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите тип формы сделки'
                    allowClear
                  >
                    {data?.data?.transaction_form_type?.map(
                      (formType: string) => (
                        <Select.Option key={formType} value={formType}>
                          {formType}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name='location' label='Местоположение'>
                  <Select
                    value={location}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите местоположение'
                    allowClear
                  >
                    {data?.data?.location?.map((loc: string) => (
                      <Select.Option key={loc} value={loc}>
                        {loc}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name='site_type' label='Тип площадки'>
                  <Select
                    value={site_type}
                    mode='multiple'
                    size='large'
                    placeholder='Выберите тип площадки'
                    allowClear
                  >
                    {data?.data?.site_type?.map((type: string) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name='specialized_site_is_free_customs_zone_regime'
                  label='Наличие режима свободной таможенной зоны'
                >
                  <Space direction='horizontal'>
                    {data?.data?.specialized_site_is_free_customs_zone_regime?.map(
                      (regime: string) => (
                        <ButtonRounded
                          danger={regime === regimeC}
                          key={regime}
                          onClick={() => {
                            handleSetBtnFilter(
                              'specialized_site_is_free_customs_zone_regime',
                              regime,
                              regimeC,
                              setRegimeC
                            )
                          }}
                        >
                          {regime}
                        </ButtonRounded>
                      )
                    )}
                  </Space>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name='real_estate_maip'
                  label='Наличие МАИП'
                  shouldUpdate
                >
                  <Space direction='horizontal'>
                    {data?.data?.real_estate_maip?.map((maip: string) => (
                      <ButtonRounded
                        danger={maip === maipC}
                        key={maip}
                        onClick={() =>
                          handleSetBtnFilter(
                            'real_estate_maip',
                            maip,
                            maipC,
                            setMaipC
                          )
                        }
                      >
                        {maip}
                      </ButtonRounded>
                    ))}
                  </Space>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[20, 20]} justify='center'>
              <Col>
                <ButtonPrimaryRed
                  loading={isLoading}
                  size='large'
                  style={{
                    minWidth: '150px',
                  }}
                  htmlType='submit'
                >
                  Найти
                </ButtonPrimaryRed>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

InvestObjectsFilterCard.displayName = 'InvestObjectsFilterCard'

export default InvestObjectsFilterCard
