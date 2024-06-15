import { SearchOutlined } from '@ant-design/icons'
import { Form, Input, Space } from 'antd'
import debounce from 'lodash/debounce'
import React, { useCallback } from 'react'

import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import type { FCC } from '@/types'

import styles from './SearchInput.module.scss'

interface SearchInputProps {
  onSearch: (value: string) => void
}
const SearchInput: FCC<SearchInputProps> = ({ onSearch }) => {
  const [form] = Form.useForm()

  const debouncedOnSearch = useCallback(debounce(onSearch, 800), [onSearch])

  const handleSubmit = useCallback(() => {
    const { search } = form.getFieldsValue()
    debouncedOnSearch(search)
  }, [form, debouncedOnSearch])

  return (
    <Form form={form} layout='inline' className={styles.formContainer}>
      <Space direction='horizontal' size={0}>
        <Form.Item name='search'>
          <Input
            className={styles.inputContainer}
            size='large'
            allowClear
            placeholder='Поиск...'
            onChange={handleSubmit}
          />
        </Form.Item>
        <div className={styles.searchBtn}>
          <ButtonPrimaryRed
            size='large'
            icon={<SearchOutlined />}
            onClick={handleSubmit}
          >
            Поиск
          </ButtonPrimaryRed>
        </div>
      </Space>
    </Form>
  )
}

export default SearchInput
