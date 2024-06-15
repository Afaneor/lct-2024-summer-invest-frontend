import { Card, Col, Collapse, Divider, List, Row } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

import { ListItemButton } from '@/components/ListItemButton'
import type {
  ProblemCategoriesModelProps,
  ProblemProps,
  ProblemSubcategoryProps,
  ProblemThemeProps,
} from '@/models/ProblemCategories'

import styles from './CategoriesCascader.module.scss'

type CascadeComponentProps = {
  isLoading?: boolean
  data: ProblemCategoriesModelProps[]
  search?: string
}

const CascadeComponent: React.FC<CascadeComponentProps> = ({
  data,
  search,
  isLoading,
}) => {
  const [problemSubcategories, setProblemSubcategories] = useState<
    ProblemSubcategoryProps[]
  >([])
  const [problemThemes, setProblemThemes] = useState<ProblemThemeProps[]>([])
  const [problems, setProblems] = useState<ProblemProps[]>([])
  const [activeIdObj, setActiveIdObj] = useState(
    {} as Record<string, number | string | undefined>
  )

  useEffect(() => {
    setProblemSubcategories([])
    setProblemThemes([])
    setProblems([])
    setActiveIdObj({})
  }, [data])

  const handleCategoryClick = (
    id: number | string,
    subcategories: ProblemSubcategoryProps[]
  ) => {
    setActiveIdObj(() => ({ category: id }))
    setProblemSubcategories(subcategories)
    setProblemThemes([])
    setProblems([])
  }

  const handleSubcategoryClick = (
    id: number | string,
    themes: ProblemThemeProps[]
  ) => {
    setActiveIdObj((prev) => ({ ...prev, theme: undefined, subcategory: id }))
    setProblemThemes(themes)
    setProblems([])
  }

  const handleThemeClick = (
    id: number | string,
    problemsList: ProblemProps[]
  ) => {
    setActiveIdObj((prev) => ({ ...prev, theme: id }))
    setProblems(problemsList)
  }

  useEffect(() => {
    if (search && data) {
      for (const category of data) {
        for (const subcategory of category.problem_subcategories) {
          for (const theme of subcategory.problem_themes) {
            for (const problem of theme.problems) {
              if (
                problem.name
                  .toLocaleLowerCase()
                  .includes(search?.toLocaleLowerCase())
              ) {
                handleCategoryClick(category.id, category.problem_subcategories)
                handleSubcategoryClick(
                  subcategory.id,
                  subcategory.problem_themes
                )
                handleThemeClick(theme.id, theme.problems)
                return
              }
            }
          }
        }
      }
    }
  }, [search, data])

  return (
    <Row gutter={[10, 10]}>
      <Col xs={24} md={5}>
        <Card className={styles.card}>
          <List
            loading={isLoading}
            dataSource={data}
            renderItem={(item: ProblemCategoriesModelProps) => (
              <ListItemButton
                key={item.id}
                isActive={activeIdObj.category === item.id}
                onClick={() =>
                  handleCategoryClick(item.id, item.problem_subcategories)
                }
              >
                {item.name}
              </ListItemButton>
            )}
          />
        </Card>
      </Col>
      {problemSubcategories.length > 0 ? (
        <Col xs={24} md={5}>
          <Card className={styles.card}>
            <List
              dataSource={problemSubcategories}
              renderItem={(subcategory: ProblemSubcategoryProps) => (
                <ListItemButton
                  isActive={activeIdObj.subcategory === subcategory.id}
                  key={subcategory.id}
                  onClick={() =>
                    handleSubcategoryClick(
                      subcategory.id,
                      subcategory.problem_themes
                    )
                  }
                >
                  {subcategory.name}
                </ListItemButton>
              )}
            />
          </Card>
        </Col>
      ) : null}
      {problemThemes.length > 0 ? (
        <Col xs={24} md={5}>
          <Card className={styles.card}>
            <List
              dataSource={problemThemes}
              renderItem={(theme: ProblemThemeProps) => (
                <ListItemButton
                  isActive={activeIdObj.theme === theme.id}
                  key={theme.id}
                  onClick={() => handleThemeClick(theme.id, theme.problems)}
                >
                  {theme.name}
                </ListItemButton>
              )}
            />
          </Card>
        </Col>
      ) : null}
      {problems.length > 0 ? (
        <Col xs={24} md={9}>
          <Card className={styles.card}>
            <Collapse accordion defaultActiveKey={['1']} ghost>
              {problems.map((problem) => (
                <Collapse.Panel key={problem.id} header={problem.name}>
                  <Divider className={styles.divider} />
                  <div className={styles.additionalInfo}>
                    <span>{problem.additional_info}</span>
                    <Link target='_blank' type='primary' href={problem.url}>
                      Перейти
                    </Link>
                  </div>
                </Collapse.Panel>
              ))}
            </Collapse>
          </Card>
        </Col>
      ) : null}
    </Row>
  )
}

export default CascadeComponent
