import { Card, Carousel, Col, Row } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

import { ImageContainer } from '@/components/ImageContainer'
import { PageWrapper } from '@/components/PageWrapper'
import { Meta } from '@/layouts/Meta'
import type { InvestmentObjectsModelProps } from '@/models/InvestmentObjects'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { useFetchOneItem } from '@/services/base/hooks'
import { Main } from '@/templates/Main'
import type { ReactQueryFetch } from '@/types'

const model = InvestmentObjectsModel

const InvestmentObjectItem = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: response,
    isLoading,
  }: ReactQueryFetch<InvestmentObjectsModelProps> | any = useFetchOneItem(
    model,
    id
  )

  return (
    <Main
      meta={
        <Meta
          title='Умный помощник'
          description='Поможем найти то, что вам нужно'
        />
      }
    >
      <PageWrapper
        isLoading={isLoading}
        title={response?.data?.name}
        subTitle='Поможем найти то, что вам нужно'
      >
        <Card>
          <Row>
            <Col xs={24} md={16}>
              <Carousel arrows>
                {response?.data?.photo_urls.map((url: string) => (
                  <ImageContainer
                    key={response?.data?.id}
                    src={url}
                    alt={response?.data?.name}
                    height='50vh'
                  />
                ))}
              </Carousel>
            </Col>
          </Row>
        </Card>
      </PageWrapper>
    </Main>
  )
}

export default InvestmentObjectItem
