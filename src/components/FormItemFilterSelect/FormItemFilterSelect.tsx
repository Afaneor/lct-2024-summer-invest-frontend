import { Form, Select } from 'antd'
import { isObject } from 'lodash'
import React from 'react'
import type { FCC } from 'src/types'

interface FormItemFilterSelectProps {
  name: string
  label: string
  value?: string
  options: string[] | Record<string, string>
  size?: 'large' | 'middle' | 'small'
  placeholder?: string
  mode?: 'multiple' | 'tags'
}

const FormItemFilterSelect: FCC<FormItemFilterSelectProps> = ({
  value,
  options,
  mode,
  name,
  label,
  size,
  placeholder,
}) => {
  return (
    <Form.Item name={name} label={label}>
      <Select
        value={value}
        mode={mode}
        size={size}
        placeholder={placeholder}
        allowClear
      >
        {!isObject(options)
          ? (options as string[])?.map((option: string) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))
          : Object.entries(options).map(([k, v]) => (
              <Select.Option key={k} value={k}>
                {v}
              </Select.Option>
            ))}
      </Select>
    </Form.Item>
  )
}

FormItemFilterSelect.displayName = 'FormItemFilterSelect'

export default FormItemFilterSelect
