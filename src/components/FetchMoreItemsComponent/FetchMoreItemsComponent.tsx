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

const FetchMoreItemsComponent: FCC<FetchMoreItemsComponentProps> = ({
  model: Model,
  defFilters,
  renderItems,
  options,
  lengthPostfixPlural,
}) => {
  const { rowData, fetchNextPage, isLoading, isFetching, hasNextPage }: any =
    useInfinityFetchData(Model, defFilters, { ...options })

  return (
    <>
      <Row gutter={40}>
        <Col span={24} className={styles.dataLengthContainer}>
          <Text strong>Найдено {rowData.length} </Text>
          {lengthPostfixPlural}
        </Col>
      </Row>
      <Spin spinning={isLoading}>{renderItems(rowData)}</Spin>
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
