import type { FormInstance } from 'antd'
import { Col, Form, Input, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle, FormItem } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { PageCardContainer } from '@/components/PageCardContainer'
import type { FormErrorObj } from '@/hooks/useFormErrors'

interface AddBusinessBiInnProps {
  onAddByInn?: (values: Record<'inn', string>) => void
  isLoading?: boolean
  errors: FormErrorObj
  form: FormInstance
}

const AddBusinessBiInn: FCC<AddBusinessBiInnProps> = ({
  onAddByInn,
  isLoading,
  errors,
  form,
}) => {
  const onFinish = (values: any) => {
    form.validateFields().then(() => {
      onAddByInn?.(values)
    })
  }
  console.log('errors', errors)
  return (
    <PageCardContainer title='Добавьте свой бизнес в нашу систему'>
      <BebasNeueTitle
        level={4}
        title='Это улучшить результаты поиска инвестиционных площадок'
      />
      <Row>
        <Col span={24}>
          <Form
            form={form}
            name='customized_form_controls'
            layout='inline'
            onFinish={onFinish}
            initialValues={{}}
          >
            <FormItem name='inn' required errors={errors?.inn}>
              <Input placeholder='ИНН' size='large' />
            </FormItem>
            <Form.Item shouldUpdate>
              {() => (
                <ButtonPrimaryRed
                  loading={isLoading}
                  htmlType='submit'
                  size='large'
                  disabled={!form.getFieldValue('inn')}
                >
                  Добавить
                </ButtonPrimaryRed>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageCardContainer>
  )
}

AddBusinessBiInn.displayName = 'AddBusinessBiInn'

export default AddBusinessBiInn
