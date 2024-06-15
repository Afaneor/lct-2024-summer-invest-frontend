import { Card, Col, Collapse, Row } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { BebasNeueTitle } from '@/chat/components/BebasNeueTitle'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { CommentsComponent } from '@/components/CommentsComponent'
import { PageWrapper } from '@/components/PageWrapper'
import { Meta } from '@/layouts/Meta'
import type { SupportModelProps } from '@/models'
import { CONTENT_TYPE, SupportModel } from '@/models'
import { useFetchOneItem } from '@/services/base/hooks'
import { Main } from '@/templates/Main'
import type { ReactQueryFetch } from '@/types'

const dataMapping = {
  description: 'Описание',
  legal_act:
    'Название нормативно-правового акта, на основании которого осуществляется поддержка',
  url_legal_act: 'ссылка на акт',
  applicant_requirement: 'Требование к заявителю',
  applicant_procedure: 'Процедура подачи заявки',
  required_document: 'Необходимые документы',
}

const Model = SupportModel

const SupportItem = () => {
  const router = useRouter()
  const { id } = router.query

  const {
    data: response,
    isLoading,
  }: ReactQueryFetch<SupportModelProps> | any = useFetchOneItem({
    model: Model,
    id,
    options: {
      enabled: !!id,
    },
  })

  return (
    <Main
      meta={
        <Meta title='Мера поддержки бизнеса' description='Поддержка бизнеса' />
      }
    >
      <PageWrapper
        isLoading={isLoading}
        title={response?.data?.name}
        lastCrumb={response?.data?.name}
      >
        <Row gutter={[10, 10]}>
          {Object.entries(dataMapping).map(([key, value]: any) => (
            <Col span={24} key={key}>
              <Card
                styles={{
                  body: {
                    padding: 0,
                  },
                }}
              >
                <Collapse ghost size='large' defaultActiveKey={['description']}>
                  <Collapse.Panel
                    header={<BebasNeueTitle level={4} title={value} />}
                    key={key}
                  >
                    {response?.data[key]}
                  </Collapse.Panel>
                </Collapse>
              </Card>
            </Col>
          ))}
          <Col span={24}>
            <Link href={response?.data?.url_application_form || ''}>
              <ButtonPrimaryRed size='large'>
                Форма подачи заявления
              </ButtonPrimaryRed>
            </Link>
          </Col>
        </Row>

        <Card
          style={{
            marginTop: '20px',
          }}
        >
          <BebasNeueTitle
            style={{
              marginBottom: '20px',
            }}
            level={3}
            title='Комментарии'
          />
          <CommentsComponent object_id={id} content_type={CONTENT_TYPE} />
        </Card>
      </PageWrapper>
    </Main>
  )
}

export default SupportItem
