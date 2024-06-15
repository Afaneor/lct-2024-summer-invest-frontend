import { Button, Col, Divider, Row, Spin, Typography } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import type { BaseModel } from '@/models'
import { useInfinityFetchData } from '@/services/base/useInfinityFetchData'

import styles from './FetchMoreItemsComponent.module.scss'

const { Text } = Typography

interface FetchMoreItemsComponentProps {
  model: typeof BaseModel
  defFilters?: Record<string, any>
  options?: Record<string, any>
  renderItems: (data: any[]) => React.ReactNode
  lengthPostfixPlural?: string
}

const fakeRowData = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  title: `Технопарк Красный пролетарий ${i}`,
  address: `127473, г. Москва, ул. Краснопролетарская, дом 16, строение ${i}`,
  text: `Text ${i}`,
  amount: `Amount ${i}`,
  is_actual: i % 2 === 0,
  site: 'https://google.com',
  preview_image: 'https://via.placeholder.com/200',
}))
const FetchMoreItemsComponent: FCC<FetchMoreItemsComponentProps> = ({
  model: Model,
  defFilters,
  renderItems,
  options,
  lengthPostfixPlural,
}) => {
  const { fetchNextPage, isLoading, isFetching, hasNextPage }: any =
    useInfinityFetchData(Model, defFilters, { ...options })

  return (
    <>
      <Row gutter={40}>
        <Col span={24} className={styles.dataLengthContainer}>
          <Text strong>Найдено {fakeRowData.length} </Text>
          {lengthPostfixPlural}
        </Col>
      </Row>
      <Spin spinning={isLoading}>{renderItems(fakeRowData)}</Spin>
      {hasNextPage ? (
        <Row justify='center' className={styles.fetchMoreBtnWrapper}>
          <Button type='dashed' loading={isFetching} onClick={fetchNextPage}>
            Показать еще
          </Button>
        </Row>
      ) : (
        <Divider>Больше нет</Divider>
      )}
    </>
  )
}

FetchMoreItemsComponent.displayName = 'FetchMoreItemsComponent'

export default FetchMoreItemsComponent
