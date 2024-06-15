import { Select } from 'antd'
import React from 'react'
import type { ChoiceProps, FCC } from 'src/types'

import type { PropsFormItem } from '@/components'
import { FormItem } from '@/components'
import { useQueryCache } from '@/hooks/useQueryCache'
import { CalculatorModel } from '@/models'

const FormItemObjectType: FCC<PropsFormItem> = ({ errors }) => {
  const choiceState: any = useQueryCache(`${CalculatorModel.modelName}Choices`)

  return (
    <FormItem
      label='Тип объекта'
      tooltip='Тип объекта'
      name='object_type'
      wrapperCol={{ span: 12 }}
      errors={errors}
      rules={[{ required: true, message: 'Пожалуйста, выберите тип объекта' }]}
    >
      <Select
        size='large'
        placeholder='Выберите тип объекта'
        allowClear
        options={choiceState?.object_type?.choices?.map((ch: ChoiceProps) => ({
          value: ch.value,
          label: ch.display_name,
        }))}
      />
    </FormItem>
  )
}

FormItemObjectType.displayName = 'FormItemObjectType'

export default FormItemObjectType
