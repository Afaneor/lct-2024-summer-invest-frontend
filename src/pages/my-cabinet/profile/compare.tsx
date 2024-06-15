import { DeleteOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Col,
  Collapse,
  Flex,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import { Links } from '@/components/Header/Links'
import { useGetDisplayName } from '@/hooks/useGetDisplayName'
import { useMoneyFormat } from '@/hooks/useMoneyFormat'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { useChoices, useFetchItems } from '@/services/base/hooks'
import MyProfileLayout from '@/templates/MyProfileLayout'

const { Text } = Typography

interface Field {
  key: string
  label: string
  valueArray?: string[]
  valueChoices?: string
  valueObject?: string[]
}

const fieldsList = [
  { key: 'main_photo_url', label: 'фото' },
  { key: 'name', label: 'Наименование' },
  { key: 'object_type', label: 'Тип объекта', valueChoices: 'object_type' },
  {
    key: 'economic_activities',
    label: 'Экономическая деятельность',
    valueArray: ['name', 'code'],
  },
  {
    key: 'transaction_form',
    label: 'Форма сделки',
    valueObject: ['name'],
  },
  { key: 'cost', label: 'Стоимость' },
  { key: 'land_area', label: 'Площадь земли' },
  { key: 'building_area', label: 'Площадь помещений' },
  { key: 'location', label: 'Местоположение' },
  { key: 'url', label: 'Ссылка на объект' },
]

const colItemStyle = {
  minHeight: '50px',
  borderBottom: '1px solid #f0f0f0',
  padding: '8px',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'end',
  justifyContent: 'end',
} as React.CSSProperties

const Model = InvestmentObjectsModel

const Compare = () => {
  useChoices(Model.modelName, Model.url())
  const money = useMoneyFormat()

  const [items, setItems] = useState<Array<string | null>>([])
  const getDisplayName = useGetDisplayName(Model.modelName)

  useEffect(() => {
    const keys = [Model.modelName]
    const localStorageItems: string | null = localStorage.getItem(
      keys.join('_')
    )
    setItems(JSON.parse(localStorageItems || '[]'))
  }, [])

  const { results, refetch } = useFetchItems({
    model: Model,
    filter: {
      id: items,
      limit: 1000,
    },
    options: {
      enabled: items.length !== 0,
    },
  })

  const handleDeleteItemFromLocalStorage = (recId: number) => {
    const compareItems = JSON.parse(
      localStorage.getItem(Model.modelName) || '[]'
    )
    const deleterIndex = compareItems.findIndex(
      (item: number) => item === recId
    )
    compareItems.splice(deleterIndex, 1)
    localStorage.setItem(Model.modelName, JSON.stringify(compareItems))
    setItems(compareItems)
    refetch()
  }

  const getRender = (fieldKey: string, text: string, recId: number) => {
    if (!text) return <Text type='secondary'>нет данных</Text>

    switch (fieldKey) {
      case 'main_photo_url':
        return (
          <Space direction='vertical'>
            <img src={text} alt='main_photo' style={{ width: '100%' }} />
            <Tooltip title='Удалить из сравнения' placement='top'>
              <Button
                shape='circle'
                type='text'
                size='small'
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteItemFromLocalStorage(recId)}
              />
            </Tooltip>
          </Space>
        )
      case 'cost':
        return money(+text)
      case 'url':
        return <a href={text}>Ссылка на объект</a>
      case 'name':
        return (
          <Link target='_blank' href={`${Links.SMART_ASSISTANT.href}/${recId}`}>
            {text}
          </Link>
        )
      default:
        return text
    }
  }
  const getFieldValues = (record: Record<string, any>, field: Field) => {
    if (field?.valueArray) {
      const tStrList = (record[field.key] || []).map(
        (arrItem: Record<string, any>) =>
          field?.valueArray
            ?.map((key: string) => arrItem[key])
            .filter(Boolean)
            .join(',')
      )
      return tStrList.join('; ')
    }
    if (field?.valueChoices) {
      return getDisplayName(field.valueChoices, record[field.key])
    }
    if (field?.valueObject) {
      return field?.valueObject
        ?.map((key: string) => record[field.key][key])
        .join(' ')
    }
    return record[field.key]
  }
  return (
    <MyProfileLayout>
      {items?.length !== 0 && results?.length !== 0 ? (
        <Collapse defaultActiveKey={['mainParams']} ghost>
          <Collapse.Panel
            header={<BebasNeueTitle level={4} title='Основные параметры' />}
            key='mainParams'
          >
            <div
              style={{
                width: '100%',
                overflowX: 'auto',
              }}
            >
              {fieldsList.map((field: Field) => (
                <Flex key={field.key}>
                  {results?.map(
                    (record: Record<string, any>, fIndex: number) => (
                      <Col style={colItemStyle} key={record.id} span={6}>
                        <Row
                          justify='end'
                          style={{ height: '100%' }}
                          gutter={[10, 10]}
                        >
                          {fIndex === 0 ? (
                            <Col span={24}>
                              <Text
                                type='secondary'
                                title={field.label}
                                ellipsis
                              >
                                {field?.label?.toUpperCase()}
                              </Text>
                            </Col>
                          ) : null}
                          <Col span={24}>
                            {getRender(
                              field.key,
                              getFieldValues(record, field),
                              record.id
                            )}
                          </Col>
                        </Row>
                      </Col>
                    )
                  )}
                </Flex>
              ))}
            </div>
          </Collapse.Panel>
        </Collapse>
      ) : (
        <Alert
          message='Добавьте объекты для сравнения'
          description={
            <Link href={Links.SMART_ASSISTANT.href}>
              Для сравнения объектов, перейдите на страницу Умного помощника и
              нажмите на кнопку Сравнить
            </Link>
          }
          type='info'
          showIcon
        />
      )}
    </MyProfileLayout>
  )
}

export default Compare
