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
import { WantToTakeSmartAssistant } from '@/components/WantToTakeSmartAssistant'
import { useEntityTypeFilter } from '@/hooks/useEntityTypeFilter'
import { Meta } from '@/layouts/Meta'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { Main } from '@/templates/Main'

const Model = InvestmentObjectsModel
const defFilters = { limit: 12 }

const SmartAssistant = () => {
  const { filter, setChatFilter } = useContext(ChatContext)
  const [divRef, scrollTo] = useScrollIntoViewOnCall()

  const { shortFilter, handleSetFilter } = useEntityTypeFilter(
    'investment_object',
    filter,
    setChatFilter
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
      <ChatComponent />
      <PageWrapper
        title='Умный помощник'
        subTitle='Поможем найти то, что вам нужно'
      >
        <FetchMoreItemsComponent
          model={Model}
          defFilters={{ ...defFilters, ...shortFilter }}
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
                <WantToTakeSmartAssistant />
              </Col>
              <Col span={24}>
                <InvestObjectsFilterCard
                  isLoading={isLoading || isFetching}
                  object_type={shortFilter?.object_type}
                  specialized_site_is_free_customs_zone_regime={
                    shortFilter?.specialized_site_is_free_customs_zone_regime
                  }
                  real_estate_maip={shortFilter?.real_estate_maip}
                  location={shortFilter?.location}
                  transaction_form_type={shortFilter?.transaction_form_type}
                  transaction_form_name={shortFilter?.transaction_form_name}
                  site_type={shortFilter?.site_type}
                  preferential_treatment={shortFilter?.preferential_treatment}
                  economic_activity_code={shortFilter?.economic_activity_code}
                  onChange={handleSetFilter}
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
                <Col key={investmentObject.id.value} xs={24} md={12} xl={8}>
                  <InvestmentItemsCard
                    id={investmentObject.id.value}
                    href={`${Links.SMART_ASSISTANT.href}/${investmentObject.id.value}`}
                    key={investmentObject.id.value}
                    hoverable
                    title={investmentObject.name.value}
                    preview_image={investmentObject.main_photo_url.value}
                    transaction_form={
                      investmentObject.transaction_form?.value?.name
                    }
                    object_type={investmentObject.object_type?.value}
                    coast={investmentObject.coast?.value}
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

export default SmartAssistant
