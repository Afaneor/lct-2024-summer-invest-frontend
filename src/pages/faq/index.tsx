import { Col, Row } from 'antd'
import React from 'react'

import CascadeComponent from '@/components/CategoriesCascader/CategoriesCascader'
import { PageWrapper } from '@/components/PageWrapper'
import { SearchInput } from '@/components/SearchInput'
import { useFilter } from '@/hooks/useFilter'
import { Meta } from '@/layouts/Meta'
import { ProblemCategoriesModel } from '@/models/ProblemCategories'
import { useFetchItems } from '@/services/base/hooks'
import { Main } from '@/templates/Main'

const Model = ProblemCategoriesModel

const Supports = () => {
  const [filter, setFilter] = useFilter({ limit: 1000 })
  const { results, isLoading } = useFetchItems(Model, filter)
  return (
    <Main
      meta={
        <Meta title='Поддержка бизнеса' description='Мера поддержки бизнеса' />
      }
    >
      <PageWrapper
        title='Ответы на вопросы'
        subTitle='Собрали все ответы на актуальные вопросы'
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
        <CascadeComponent
          data={results}
          isLoading={isLoading}
          search={filter?.search}
        />
      </PageWrapper>
    </Main>
  )
}

export default Supports
