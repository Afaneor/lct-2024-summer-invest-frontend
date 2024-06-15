import { Card, Col, Descriptions, Row } from 'antd'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'

import { BebasNeueTitle } from '@/chat/components/BebasNeueTitle'
import { CommentsComponent } from '@/components/CommentsComponent'
import { PageWrapper } from '@/components/PageWrapper'
import { ReadyBusinessDescription } from '@/components/ReadyBusinessDescription'
import { TruncateText } from '@/components/TruncateText'
import { Meta } from '@/layouts/Meta'
import type { SupportModelProps } from '@/models'
import { CONTENT_TYPE, SupportModel } from '@/models'
import { useFetchOneItem } from '@/services/base/hooks'
import { Main } from '@/templates/Main'
import type { ReactQueryFetch } from '@/types'

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
        <Card>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={16}>
              <Descriptions title='User Info'>
                <Descriptions.Item label='UserName'>
                  Zhou Maomao
                </Descriptions.Item>
                <Descriptions.Item label='Telephone'>
                  1810000000
                </Descriptions.Item>
                <Descriptions.Item label='Live'>
                  Hangzhou, Zhejiang
                </Descriptions.Item>
                <Descriptions.Item label='Remark'>empty</Descriptions.Item>
                <Descriptions.Item label='Address'>
                  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                </Descriptions.Item>
              </Descriptions>
              ;
            </Col>
            <Col>
              <TruncateText text={response?.data?.description} length={400} />
            </Col>
            <Col xs={24}>
              {!isEmpty(response?.data?.ready_business) ? (
                <ReadyBusinessDescription
                  readyBusinessData={response?.data?.ready_business}
                />
              ) : null}
            </Col>
          </Row>
        </Card>
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
