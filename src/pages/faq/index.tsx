import { Col, Row } from 'antd'
import React, { useContext } from 'react'

import CascadeComponent from '@/components/CategoriesCascader/CategoriesCascader'
import { ChatContext } from '@/components/ChatContextProvider/ChatContextProvider'
import { PageWrapper } from '@/components/PageWrapper'
import { SearchInput } from '@/components/SearchInput'
import { useEntityTypeFilter } from '@/hooks/useEntityTypeFilter'
import { Meta } from '@/layouts/Meta'
import { ProblemCategoriesModel } from '@/models/ProblemCategories'
import { useFetchItems } from '@/services/base/hooks'
import { Main } from '@/templates/Main'

const Model = ProblemCategoriesModel

const defFilters = { limit: 1000 }
const Supports = () => {
  const { filter, setChatFilter } = useContext(ChatContext)

  // const [filter, setFilter] = useFilter({ limit: 1000 })
  const { results, isLoading } = useFetchItems({
    model: Model,
    filter: {
      ...defFilters,
      ...filter,
    },
  })

  const { shortFilter, handleSetFilter } = useEntityTypeFilter(
    'category_problem',
    filter,
    setChatFilter
  )

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
                searchStr={shortFilter?.search}
                onSearch={(search) => {
                  handleSetFilter({ search })
                }}
              />
            </Col>
          </Row>
        }
      >
        <CascadeComponent
          data={results}
          isLoading={isLoading}
          search={shortFilter?.search}
        />
      </PageWrapper>
    </Main>
  )
}

export default Supports
