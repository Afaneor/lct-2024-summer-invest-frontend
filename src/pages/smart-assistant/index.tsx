import { Col, Row } from 'antd'
import React, { useContext } from 'react'

import { useScrollIntoViewOnCall } from '@/chat/hooks/useScrollIntoView'
import { ChatComponent } from '@/components/ChatComponent'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { Links } from '@/components/Header/Links'
import { InvestmentItemsCard } from '@/components/InvestmentItemsCard'
import { InvestObjectsFilterCard } from '@/components/InvestObjectsFilterCard'
import { NeedModeResultsComponent } from '@/components/NeedModeResultsComponent/'
import { PageWrapper } from '@/components/PageWrapper'
import { Meta } from '@/layouts/Meta'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import withAuth from '@/pages/HOC'
import { Main } from '@/templates/Main'

const Model = InvestmentObjectsModel
const defFilters = { limit: 12 }

const SmartHelper = () => {
  const { filter, setChatFilter } = useContext(ChatContext)
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
        <FetchMoreItemsComponent
          model={Model}
          defFilters={{ ...defFilters, ...filter }}
          lengthPostfixPlural='площадок'
          renderItems={({
            data: rowData,
            fetchNextPage,
            dataCount,
            isFetching,
            isLoading,
          }) => (
            <Row gutter={[40, 20]}>
              <Col span={24}>
                <InvestObjectsFilterCard
                  isLoading={isLoading || isFetching}
                  object_type={filter?.object_type}
                  specialized_site_is_free_customs_zone_regime={
                    filter?.specialized_site_is_free_customs_zone_regime
                  }
                  real_estate_maip={filter?.real_estate_maip}
                  location={filter?.location}
                  transaction_form_type={filter?.transaction_form_type}
                  transaction_form_name={filter?.transaction_form_name}
                  site_type={filter?.site_type}
                  economic_activity_name={filter?.economic_activity_name}
                  preferential_treatment={filter?.preferential_treatment}
                  onChange={setChatFilter}
                />
              </Col>
              {dataCount ? (
                <Col span={24}>
                  <NeedModeResultsComponent
                    onClick={() => {
                      fetchNextPage?.()
                      scrollTo()
                    }}
                  />
                </Col>
              ) : null}
              {rowData?.map((investmentObject) => (
                <Col key={investmentObject.id.value} xs={24} md={12} lg={8}>
                  <InvestmentItemsCard
                    id={investmentObject.id.value}
                    href={`${Links.SMART_ASSISTANT.href}/${investmentObject.id.value}`}
                    key={investmentObject.id.value}
                    hoverable
                    title={investmentObject.name.value}
                    preview_image={investmentObject.main_photo_url.value}
                  />
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

export default withAuth(SmartHelper)
