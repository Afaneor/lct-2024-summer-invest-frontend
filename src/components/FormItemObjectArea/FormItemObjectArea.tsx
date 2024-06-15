import { GatewayOutlined } from '@ant-design/icons'
import { Col, InputNumber, Row } from 'antd'
import React from 'react'

import type { PropsFormItem } from '@/components'
import { FormItem } from '@/components'
import type { FormError } from '@/hooks/useFormErrors'
import type { FCC } from '@/types'

interface FormItemObjectAreaProps extends PropsFormItem {
  errorsFromLandArea?: FormError
  errorsToLandArea?: FormError
}

const FormItemObjectArea: FCC<FormItemObjectAreaProps> = ({
  errors,
  errorsFromLandArea,
  errorsToLandArea,
}) => {
  return (
    <FormItem
      label='Площадь объекта (кв.м.)'
      tooltip='Площадь объекта (в квадратных метрах)'
      wrapperCol={{ span: 12 }}
      errors={errors}
    >
      <Row gutter={20} justify='space-between'>
        <Col xs={24} md={11}>
          <FormItem
            help='от'
            name='from_object_area'
            errors={errorsFromLandArea}
            rules={[
              ({ getFieldValue, setFieldValue }) => ({
                validator(_, value) {
                  const toLAndArea = getFieldValue('to_object_area')
                  if (value > toLAndArea) {
                    setFieldValue('to_object_area', value)
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <InputNumber
              placeholder='10'
              size='large'
              min={0}
              className='w100'
              addonBefore={<GatewayOutlined />}
              addonAfter={
                <span>
                  м<sup>2</sup>
                </span>
              }
            />
          </FormItem>
        </Col>
        <Col md={1} xs={0}>
          -
        </Col>
        <Col md={11} xs={22}>
          <FormItem
            help='до'
            name='to_object_area'
            errors={errorsToLandArea}
            rules={[
              ({ getFieldValue, setFieldValue }) => ({
                validator(_, value) {
                  const fromLandArea = getFieldValue('from_object_area')
                  if (value < fromLandArea) {
                    setFieldValue('to_object_area', fromLandArea)
                  }
                  return Promise.resolve()
                },
              }),
            ]}
          >
            <InputNumber
              placeholder='1000'
              size='large'
              className='w100'
              addonBefore={<GatewayOutlined />}
              addonAfter={
                <span>
                  м<sup>2</sup>
                </span>
              }
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  )
}

FormItemObjectArea.displayName = 'FormItemObjectArea'

export default FormItemObjectArea
