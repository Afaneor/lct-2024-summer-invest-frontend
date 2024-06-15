import { Card, Col, Descriptions, Row } from 'antd'
import Link from 'next/link'
import type { BaseSyntheticEvent } from 'react'
import React from 'react'

import { useScrollIntoViewOnCall } from '@/chat/hooks/useScrollIntoView'
import { BebasNeueTitle } from '@/components'
import { CardSearchFilters } from '@/components/CardSearchFilters/'
import { ChatComponent } from '@/components/ChatComponent'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { Links } from '@/components/Header/Links'
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
  const [divRef, scrollTo] = useScrollIntoViewOnCall()

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
        тип объекта / ОКВЭД \ Преференциальный режим \ Форма сделки \ Стоимость
        от до \ Муниципальное образование \ Площадь объекта от до
        <CardSearchFilters
          onChange={(evt: BaseSyntheticEvent) => {
            setFilter({ territorial_location: evt?.target?.value?.id })
          }}
        />
        <FetchMoreItemsComponent
          model={Model}
          defFilters={filter}
          lengthPostfixPlural='площадок'
          renderItems={(
            rowData: ModelOptionProps<InvestmentObjectsModelProps>[],
            fetchNextPage: () => void
          ) => (
            <Row gutter={[40, 20]}>
              <Col span={24}>
                <NeedModeResultsComponent
                  onClick={() => {
                    fetchNextPage?.()
                    scrollTo()
                  }}
                />
              </Col>
              {rowData?.map((investmentObject) => (
                <Col key={investmentObject.id.value} xs={24} md={12} lg={8}>
                  <Link
                    href={`${Links.SMART_ASSISTANT.href}/${investmentObject.id.value}`}
                  >
                    <ItemsCard
                      key={investmentObject.id.value}
                      hoverable
                      title={investmentObject.name.value}
                      preview_image={investmentObject.main_photo_url.value}
                      territorial_location='investmentObject.object_type.value'
                    />
                  </Link>
                </Col>
              ))}
              <div ref={divRef} />
            </Row>
          )}
        />
      </PageWrapper>
    </Main>
  )
}

export default SmartHelper
