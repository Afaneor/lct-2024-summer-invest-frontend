import { Col, Row } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'

import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { Links } from '@/components/Header/Links'
import { PageWrapper } from '@/components/PageWrapper'
import { SearchInput } from '@/components/SearchInput'
import { SupportCard } from '@/components/SupportCard'
import { SupportFiltersCard } from '@/components/SupportFiltersCard'
import { Meta } from '@/layouts/Meta'
import type { SupportModelProps } from '@/models'
import { SupportModel } from '@/models'
import { Main } from '@/templates/Main'
import type { ModelOptionProps } from '@/types'

const Model = SupportModel

const Supports = () => {
  const { filter, setChatFilter } = useContext(ChatContext)

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
                  setChatFilter({ search })
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
                setChatFilter(obj)
              }}
            />
          </Col>
          <Col xs={24} md={16}>
            <FetchMoreItemsComponent
              defFilters={filter}
              model={Model}
              renderItems={({ data: rowData }) => (
                <Row gutter={[20, 20]}>
                  {rowData?.map(
                    (support: ModelOptionProps<SupportModelProps>) => (
                      <Col key={support.id.value} xs={24} md={24}>
                        <Link
                          href={`${Links.SUPPORTS.href}/${support.id.value}`}
                          key={support.id.value}
                        >
                          <SupportCard
                            href={support.url_application_form.value}
                            title={support.name.value}
                            text={support.description.value}
                          />
                        </Link>
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
