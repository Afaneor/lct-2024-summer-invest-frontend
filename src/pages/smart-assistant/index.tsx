import { Card, Col, Descriptions, Row } from 'antd'
import Link from 'next/link'
import type { BaseSyntheticEvent } from 'react'
import React from 'react'
import { SmartChat } from 'src/chat/SmartChat/SmartChat'

import { BebasNeueTitle } from '@/components'
import { CardSearchFilters } from '@/components/CardSearchFilters/'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { NeedModeResultsComponent } from '@/components/NeedModeResultsComponent/'
import { PageWrapper } from '@/components/PageWrapper'
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import type { AreaModelProps } from '@/models'
import { AreaModel } from '@/models'
import { Main } from '@/templates/Main'

export const SmartAssistantCard = ({
  title,
  preview_image,
  address,
  ...rest
}: any) => (
  <Card
    cover={<img style={{ height: 300 }} alt={title} src={preview_image} />}
    {...rest}
  >
    <BebasNeueTitle title={title} level={3} />

    <Descriptions column={1}>
      <Descriptions.Item>{address}</Descriptions.Item>
    </Descriptions>
  </Card>
)
const Model = AreaModel
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
      <SmartChat />
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
              {rowData?.map((area: AreaModelProps) => (
                <Col key={area.id} xs={24} md={8}>
                  <Link target='_blank' href={area.site}>
                    <SmartAssistantCard
                      hoverable
                      title={area.title}
                      preview_image={area.preview_image}
                      territorial_location={area.territorial_location}
                      address={area.address}
                      text={area.text}
                    />
                  </Link>
                </Col>
              ))}
            </Row>
          )}
        />
      </PageWrapper>
    </Main>
  )
}

export default SmartHelper
