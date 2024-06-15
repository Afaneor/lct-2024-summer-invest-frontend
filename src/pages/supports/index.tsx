import { Col, Row } from 'antd'
import React from 'react'

import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { PageWrapper } from '@/components/PageWrapper'
import { SearchInput } from '@/components/SearchInput'
import { SupportCard } from '@/components/SupportCard'
import { SupportFiltersCard } from '@/components/SupportFiltersCard'
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import type { SupportModelProps } from '@/models'
import { SupportModel } from '@/models'
import { Main } from '@/templates/Main'
import type { ModelOptionProps } from '@/types'

const Model = SupportModel

const Supports = () => {
  const [filter, setFilter] = useFilter({})

  return (
    <Main
      meta={
        <Meta title='Поддержка бизнеса' description='Мера поддержки бизнеса' />
      }
    >
      <PageWrapper
        title='Меры поддержки бизнеса'
        subTitle='Здесь собраны все доступные меры поддержки для вашего бизнеса'
        underTitleContainer={
          <Row>
            <Col xs={24}>
              <SearchInput
                onSearch={(search) => {
                  setFilter({ search })
                }}
              />
            </Col>
          </Row>
        }
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <SupportFiltersCard
              support_level={filter.support_level}
              support_type={filter.support_type}
              msp_roster={filter.msp_roster}
              economic_activity_name={filter.economic_activity_name}
              onChange={(obj) => {
                setFilter(obj)
              }}
            />
          </Col>
          <Col xs={24} md={16}>
            <FetchMoreItemsComponent
              defFilters={filter}
              model={Model}
              renderItems={(rowData) => (
                <Row gutter={[20, 20]}>
                  {rowData?.map(
                    (support: ModelOptionProps<SupportModelProps>) => (
                      <Col key={support.id.value} xs={24} md={24}>
                        <SupportCard
                          href={support.url_application_form.value}
                          title={support.name.value}
                          text={support.description.value}
                        />
                      </Col>
                    )
                  )}
                </Row>
              )}
            />
          </Col>
        </Row>
      </PageWrapper>
    </Main>
  )
}

export default Supports
