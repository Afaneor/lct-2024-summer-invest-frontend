import { Col, Row } from 'antd'
import React from 'react'

import { FetchMoreItemsComponent } from '@/components/FetchMoreItemsComponent'
import { PageWrapper } from '@/components/PageWrapper'
import { SupportCard } from '@/components/SupportCard'
import { SupportFiltersCard } from '@/components/SupportFiltersCard'
import { Meta } from '@/layouts/Meta'
import type { SupportModelProps } from '@/models'
import { SupportModel } from '@/models'
import { Main } from '@/templates/Main'
import type { ModelOptionProps } from '@/types'

const Model = SupportModel

const Supports = () => {
  return (
    <Main
      meta={
        <Meta title='Поддержка бизнеса' description='Мера поддержки бизнеса' />
      }
    >
      <PageWrapper
        title='Меры поддержки бизнеса'
        subTitle='Здесь собраны все доступные меры поддержки для вашего бизнеса'
      >
        <Row gutter={[20, 20]}>
          <Col xs={24} md={8}>
            <SupportFiltersCard />
          </Col>
          <Col xs={24} md={16}>
            <FetchMoreItemsComponent
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
