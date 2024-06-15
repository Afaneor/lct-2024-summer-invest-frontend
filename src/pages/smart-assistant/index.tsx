import { Card, Col, Descriptions, Row } from 'antd'
import Link from 'next/link'
import type { BaseSyntheticEvent } from 'react'
import React from 'react'

import { BebasNeueTitle } from '@/components'
import { CardSearchFilters } from '@/components/CardSearchFilters/'
import { ChatComponent } from '@/components/ChatComponent'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { NeedModeResultsComponent } from '@/components/NeedModeResultsComponent/'
import { PageWrapper } from '@/components/PageWrapper'
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import type { InvestmentObjectsModelProps } from '@/models/InvestmentObjects'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { Main } from '@/templates/Main'
import type { ModelOptionProps } from '@/types'

export const ItemsCard = ({ title, preview_image, address, ...rest }: any) => (
  <Card
    cover={<img style={{ height: 300 }} alt={title} src={preview_image} />}
    {...rest}
  >
    <BebasNeueTitle title={title} ellipsis level={3} />

    <Descriptions column={1}>
      <Descriptions.Item>{address}</Descriptions.Item>
    </Descriptions>
  </Card>
)

const Model = InvestmentObjectsModel
const defFilters = { limit: 12 }

const SmartHelper = () => {
  const [filter, setFilter] = useFilter(defFilters)

  return (
    <Main
      meta={
        <Meta
          title='Умный помощник'
          description='Поможем найти то, что вам нужно'
        />
      }
    >
      <ChatComponent />
      <PageWrapper
        title='Умный помощник'
        subTitle='Поможем найти то, что вам нужно'
      >
        <CardSearchFilters
          onChange={(evt: BaseSyntheticEvent) => {
            setFilter({ territorial_location: evt?.target?.value?.id })
          }}
        />
        <NeedModeResultsComponent />
        <FetchMoreItemsComponent
          model={Model}
          defFilters={filter}
          lengthPostfixPlural='площадок'
          renderItems={(rowData) => (
            <Row gutter={[40, 20]}>
              {rowData?.map(
                (
                  investmentObject: ModelOptionProps<InvestmentObjectsModelProps>
                ) => (
                  <Col key={investmentObject.id.value} xs={24} md={8}>
                    <Link target='_blank' href={investmentObject.url.value}>
                      <ItemsCard
                        key={investmentObject.id.value}
                        hoverable
                        title={investmentObject.name.value}
                        preview_image={investmentObject.main_photo_url.value}
                        territorial_location='investmentObject.object_type.value'
                      />
                    </Link>
                  </Col>
                )
              )}
            </Row>
          )}
        />
      </PageWrapper>
    </Main>
  )
}

export default SmartHelper
