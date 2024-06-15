import { Col, InputNumber, Row } from 'antd'
import React from 'react'

import type { PropsFormItem } from '@/components'
import { FormItem } from '@/components'
import type { FormError } from '@/hooks/useFormErrors'
import type { FCC } from '@/types'

interface SFormItemPriceProps extends PropsFormItem {
  errorsFromPrice?: FormError
  errorsToPrice?: FormError
}

const FormItemPrice: FCC<SFormItemPriceProps> = ({
  errors,
  errorsFromPrice,
  errorsToPrice,
}) => {
  return (
    <FormItem
      label='Стоимость'
      tooltip='Стоимость объекта'
      wrapperCol={{ span: 12 }}
      errors={errors}
    >
      <Row gutter={20} justify='space-between'>
        <Col xs={24} md={11}>
          <FormItem
            help='от'
            name='from_price'
            errors={errorsFromPrice}
            rules={[
              ({ getFieldValue, setFieldValue }) => ({
                validator(_, value) {
                  const toPrice = getFieldValue('to_price')
                  if (value > toPrice) {
                    setFieldValue('to_price', value)
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
              addonBefore='₽'
            />
          </FormItem>
        </Col>
        <Col md={1} xs={0}>
          -
        </Col>
        <Col md={11} xs={22}>
          <FormItem
            help='до'
            name='to_price'
            errors={errorsToPrice}
            rules={[
              ({ getFieldValue, setFieldValue }) => ({
                validator(_, value) {
                  const fromPrice = getFieldValue('from_price')
                  if (value < fromPrice) {
                    setFieldValue('to_price', fromPrice)
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
              addonBefore='₽'
            />
          </FormItem>
        </Col>
      </Row>
    </FormItem>
  )
}

FormItemPrice.displayName = 'FormItemPrice'

export default FormItemPrice
