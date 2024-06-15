import { Col, Row } from 'antd'
import Link from 'next/link'
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
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import withAuth from '@/pages/HOC'
import { Main } from '@/templates/Main'

const Model = InvestmentObjectsModel
const defFilters = { limit: 12 }

const SmartHelper = () => {
  const { filter } = useContext(ChatContext)

  const [defFilter, setFilter] = useFilter(defFilters)
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
          defFilters={{ ...defFilter, ...filter }}
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
                  specialized_site_is_free_customs_zone_regime={
                    defFilter?.specialized_site_is_free_customs_zone_regime
                  }
                  real_estate_maip={defFilter?.real_estate_maip}
                  location={defFilter?.location}
                  transaction_form_type={defFilter?.transaction_form_type}
                  transaction_form_name={defFilter?.transaction_form_name}
                  site_type={defFilter?.site_type}
                  economic_activity_name={defFilter?.economic_activity_name}
                  preferential_treatment={defFilter?.preferential_treatment}
                  onChange={setFilter}
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
                  <Link
                    target='_blank'
                    href={`${Links.SMART_ASSISTANT.href}/${investmentObject.id.value}`}
                  >
                    <InvestmentItemsCard
                      key={investmentObject.id.value}
                      hoverable
                      title={investmentObject.name.value}
                      preview_image={investmentObject.main_photo_url.value}
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

export default withAuth(SmartHelper)
