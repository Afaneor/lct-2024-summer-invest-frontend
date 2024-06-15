import { Col, Layout, Row } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'

import { Header } from '@/components/Header'

const { Content } = Layout

type IMainProps = {
  meta: ReactNode
  children: ReactNode
}
const styleContent = {
  padding: 0,
  backgroundColor: '#f8f8f8',
} as Record<string, any>

const Main = (props: IMainProps) => {
  return (
    <>
      {props.meta}
      <Layout
        className='h100'
        style={{
          backgroundColor: '#fff',
        }}
      >
        <Header />
        <Content style={styleContent}>
          <Row justify='center'>
            <Col span={24}>
              <main>{props.children}</main>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  )
}

export { Main }
