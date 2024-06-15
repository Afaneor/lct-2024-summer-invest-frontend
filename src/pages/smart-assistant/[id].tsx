import { Card, Col, Row } from 'antd'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import { GenerateDescription } from 'src/components/GenerateDescription'

import { Markdown } from '@/chat/components/Markdown'
import { CarouselPageComponent } from '@/components/CarouselPageComponent'
import { CompareButton } from '@/components/CompareButton'
import { MyBusinessDescription } from '@/components/MyBusinessDescription'
import { PageWrapper } from '@/components/PageWrapper'
import { ReadyBusinessDescription } from '@/components/ReadyBusinessDescription'
import { useApiOptions } from '@/hooks/useApiOptions'
import { Meta } from '@/layouts/Meta'
import type { InvestmentObjectsModelProps } from '@/models/InvestmentObjects'
import { InvestmentObjectsModel } from '@/models/InvestmentObjects'
import { useFetchOneItem, useOptions } from '@/services/base/hooks'
import { Main } from '@/templates/Main'
import type { ReactQueryFetch } from '@/types'

const model = InvestmentObjectsModel
const optionsFieldList = ['location', 'building_area', 'cost']

const InvestmentObjectItem = () => {
  useOptions(model.modelName, model.url())
  const router = useRouter()
  const { id } = router.query

  const {
    data: response,
    isLoading,
  }: ReactQueryFetch<InvestmentObjectsModelProps> | any = useFetchOneItem({
    model,
    id,
    options: {
      enabled: !!id,
    },
  })

  const { getFullData, mergeOptionsIntoData } = useApiOptions(
    model.modelName,
    optionsFieldList
  )

  const fullData = getFullData(response?.data)

  // объединяем данные из опций в основные данные и фильтруем по маппингу
  const mData = mergeOptionsIntoData(response?.data)

  // данные для дочерних компонентов real_estate
  const childrenDataRealEstate = [
    'address',
    'procedure_determining_cost',
    'preferential_treatment',
    'application_procedure',
  ].reduce((acc, key) => {
    return {
      ...acc,
      [key]: fullData.real_estate?.children?.[key],
    }
  }, {} as Record<string, any>)

  // данные для дочерних компонентов specialized_site
  const childrenDataSpecializedSite = [
    'nearest_cities',
    'object_administrator_name',
    'address',
    'insurance_premiums',
    'income_tax',
    'land_tax',
    'is_free_customs_zone_regime',
    'minimum_investment_amount',
  ].reduce((acc, key) => {
    return {
      ...acc,
      [key]: fullData.specialized_site?.children?.[key],
    }
  }, {} as Record<string, any>)

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
        lastCrumb={response?.data?.name}
      >
        <Card>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={16}>
              <CarouselPageComponent
                photo_urls={response?.data?.photo_urls}
                main_photo_url={response?.data?.main_photo_url}
                name={response?.data?.name}
              />
            </Col>
            <Col xs={24} md={8}>
              <CompareButton
                entityType={model.modelName}
                itemId={response?.data?.id}
              />
            </Col>
            {!isEmpty(response?.data?.ready_business) ? (
              <Col xs={24}>
                <ReadyBusinessDescription
                  readyBusinessData={response?.data?.ready_business}
                />
              </Col>
            ) : null}
            {!isEmpty(response?.data?.real_estate) ? (
              <Col xs={24}>
                <GenerateDescription
                  data={mData}
                  childrenData={childrenDataRealEstate}
                />
              </Col>
            ) : null}
            {!isEmpty(response?.data?.specialized_site) ? (
              <Col xs={24}>
                <GenerateDescription
                  data={mData}
                  childrenData={childrenDataSpecializedSite}
                />
                <MyBusinessDescription
                  label={
                    fullData.specialized_site?.children?.resident_info.label
                  }
                  renderValue={
                    <Markdown
                      content={
                        fullData.specialized_site?.children?.resident_info.value
                      }
                    />
                  }
                />
              </Col>
            ) : null}
          </Row>
        </Card>
      </PageWrapper>
    </Main>
  )
}

export default InvestmentObjectItem
