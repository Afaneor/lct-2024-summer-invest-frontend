import { Button, Col, Divider, Row, Spin, Typography } from 'antd'
import React, { useMemo } from 'react'
import type { FCC } from 'src/types'

import { useApiOptions } from '@/hooks/useApiOptions'
import type { BaseModel } from '@/models'
import { useInfinityFetchData } from '@/services/base/useInfinityFetchData'

import styles from './FetchMoreItemsComponent.module.scss'

const { Text } = Typography

interface FetchMoreItemsComponentProps {
  model: typeof BaseModel
  defFilters?: Record<string, any>
  options?: Record<string, any>
  renderItems: (
    data: any[],
    fetchNextPage: () => void,
    dataCount: number
  ) => React.ReactNode
  lengthPostfixPlural?: string
  optionsFieldList?: string[]
}

const FetchMoreItemsComponent: FCC<FetchMoreItemsComponentProps> = ({
  model: Model,
  defFilters,
  renderItems,
  options,
  lengthPostfixPlural,
  optionsFieldList,
}) => {
  const {
    rowData,
    fetchNextPage,
    isLoading,
    isFetching,
    hasNextPage,
    dataCount,
  }: any = useInfinityFetchData(Model, defFilters, { ...options })

  const { mergeOptionsIntoData } = useApiOptions(
    Model.modelName,
    optionsFieldList
  )

  const rData = useMemo(
    () => rowData.map((item: any) => mergeOptionsIntoData(item)),
    [rowData]
  )
  return (
    <>
      <Row gutter={40}>
        <Col span={24} className={styles.dataLengthContainer}>
          <Text strong>Найдено {dataCount || 0} </Text>
          {lengthPostfixPlural}
        </Col>
      </Row>
      <Spin spinning={isLoading} />
      {renderItems(rData, fetchNextPage, dataCount)}
      {hasNextPage ? (
        <Row justify='center' className={styles.fetchMoreBtnWrapper}>
          <Button
            type='dashed'
            danger
            loading={isFetching}
            onClick={fetchNextPage}
          >
            Показать еще
          </Button>
        </Row>
      ) : null}
      {!hasNextPage && dataCount ? <Divider>Больше нет</Divider> : null}
    </>
  )
}

FetchMoreItemsComponent.displayName = 'FetchMoreItemsComponent'

export default FetchMoreItemsComponent
