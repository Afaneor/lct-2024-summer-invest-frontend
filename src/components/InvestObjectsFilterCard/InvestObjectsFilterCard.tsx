import { Card, Col, Collapse, Divider, Form, Row, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import { ButtonRounded } from '@/components/ButtonRounded'
import { OkvedSelectModal } from '@/components/OkvedSelectModal'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { useExtraActionsGet } from '@/services/base/hooks'

import ButtonPrimaryRed from '../ButtonPrimaryRed/ButtonPrimaryRed'
import FormItemFilterSelect from '../FormItemFilterSelect/FormItemFilterSelect'

interface InvestObjectsFilterCardProps {
  preferential_treatment?: string
  transaction_form_name?: string
  transaction_form_type?: string
  economic_activity_code?: string
  location?: string
  site_type?: string
  specialized_site_is_free_customs_zone_regime?: string
  real_estate_maip?: string
  object_type: string
  isLoading?: boolean
  onChange?: (obj: Record<string, string>) => void
}

const Model = InvestmentObjectsModel

const InvestObjectsFilterCard: FCC<InvestObjectsFilterCardProps> = ({
  onChange,
  preferential_treatment,
  transaction_form_name,
  transaction_form_type,
  location,
  object_type,
  site_type,
  isLoading,
  specialized_site_is_free_customs_zone_regime,
  real_estate_maip,
  economic_activity_code,
}) => {
  const [regimeC, setRegimeC] = useState<string | undefined>(
    specialized_site_is_free_customs_zone_regime
  )
  const [maipC, setMaipC] = useState(real_estate_maip)
  const [form] = Form.useForm()
  const {
    data,
    isLoading: isLoadingData,
  }: {
    data: Record<'data', any[]> | any
    isLoading: boolean
  } = useExtraActionsGet({
    qKey: 'investmentObjects',
    extraUrl: Model.additionalDataUrl(),
  })

  const handleSetBtnFilter = (
    k: string,
    v: string,
    current: string | undefined,
    callback: (v: string) => void
  ) => {
    form.setFieldsValue({
      [k]: v !== current ? v : '',
    })
    callback(v !== current ? v : '')
  }
  useEffect(() => {
    // необходимо для того, чтобы при изменении фильтров,
    // начальные значения устанавливались заново
    form.setFieldsValue({
      preferential_treatment,
      transaction_form_name,
      transaction_form_type,
      location,
      object_type,
      site_type,
      specialized_site_is_free_customs_zone_regime,
      real_estate_maip,
      economic_activity_code,
    })
  }, [
    preferential_treatment,
    transaction_form_name,
    transaction_form_type,
    location,
    object_type,
    site_type,
    specialized_site_is_free_customs_zone_regime,
    real_estate_maip,
    economic_activity_code,
  ])

  return (
    <Card
      styles={{
        body: {
          padding: '16px 8px 0 8px',
        },
      }}
    >
      <Collapse ghost>
        <Collapse.Panel
          key='filtersInvestObjects'
          header={<BebasNeueTitle level={4} title='Поиск' />}
        >
          <Row>
            <Divider
              style={{
                margin: '0 0 15px 0',
              }}
            />
            <Col span={24}>
              <Form
                form={form}
                initialValues={{
                  preferential_treatment,
                  transaction_form_name,
                  transaction_form_type,
                  location,
                  site_type,
                  object_type,
                  specialized_site_is_free_customs_zone_regime,
                  real_estate_maip,
                }}
                layout='vertical'
                onFinish={onChange}
              >
                <Row gutter={[20, 20]}>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='location'
                      label='Местоположение'
                      value={location}
                      options={data?.data?.location}
                      mode='multiple'
                      placeholder='Выберите местоположение'
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='site_type'
                      label='Тип площадки'
                      value={site_type}
                      options={data?.data?.site_type}
                      mode='multiple'
                      placeholder='Выберите тип площадки'
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='object_type'
                      label='Тип объекта'
                      value={object_type}
                      options={data?.data?.object_type}
                      mode='multiple'
                      placeholder='Выберите тип объекта'
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='preferential_treatment'
                      label='Преференциальный режим'
                      value={preferential_treatment}
                      options={data?.data?.preferential_treatment}
                      mode='multiple'
                      placeholder='Выберите преференциальный режим'
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='transaction_form_name'
                      label='Форма сделки'
                      value={transaction_form_name}
                      options={data?.data?.transaction_form_name}
                      mode='multiple'
                      placeholder='Выберите форму сделки'
                    />
                  </Col>
                  <Col xs={24} md={8}>
                    <FormItemFilterSelect
                      isLoading={isLoadingData}
                      name='transaction_form_type'
                      label='Тип формы сделки'
                      value={transaction_form_type}
                      options={data?.data?.transaction_form_type}
                      mode='multiple'
                      placeholder='Выберите тип формы сделки'
                    />
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
                  <Col xs={24} md={8}>
                    <Form.Item name='economic_activity_code' label='ОКВЭД'>
                      <OkvedSelectModal
                        value={data?.data?.economic_activity_code}
                      />
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
        </Collapse.Panel>
      </Collapse>
    </Card>
  )
}

InvestObjectsFilterCard.displayName = 'InvestObjectsFilterCard'

export default InvestObjectsFilterCard
