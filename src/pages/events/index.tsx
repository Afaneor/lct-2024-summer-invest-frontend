import { Col, Row } from 'antd'
import React from 'react'

import { EventCard } from '@/components/EventCard'
import { EventFilterCard } from '@/components/EventFilterCard'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { PageWrapper } from '@/components/PageWrapper'
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import type { EventModelProps } from '@/models/Event'
import { EventModel } from '@/models/Event'
import { Main } from '@/templates/Main'
import type { ModelOptionProps } from '@/types'

const Model = EventModel

const Events = () => {
  const [filter, setFilter] = useFilter()

  return (
    <Main meta={<Meta title='Блог' description='Блог о самом главном' />}>
      <PageWrapper title='Мероприятия' subTitle='Актуальные мероприятия'>
        <FetchMoreItemsComponent
          model={Model}
          defFilters={filter}
          renderItems={({ data: rowData }) => (
            <Row gutter={[20, 20]}>
              <Col xs={24} md={6}>
                <EventFilterCard onChange={setFilter} />
              </Col>
              <Col xs={24} md={18}>
                <Row gutter={[20, 20]}>
                  {rowData.map((item: ModelOptionProps<EventModelProps>) => (
                    <Col xs={24} md={12} key={item.id.value}>
                      <EventCard
                        name={item.name.value}
                        date={item?.event_datetime?.value}
                        description={item.description.value}
                        photo={item?.photo?.value}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          )}
        />
      </PageWrapper>
    </Main>
  )
}

export default Events
