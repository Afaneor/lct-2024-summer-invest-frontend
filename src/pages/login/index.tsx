import { Card, Col, Row } from 'antd'
import React from 'react'
import type { FCC } from 'src/types'

import AuthCardComponent from '@/components/AuthCardComponent/AuthCardComponent'
import { Meta } from '@/layouts/Meta'
import { Main } from '@/templates/Main'

const Login: FCC = () => {
  return (
    <Main meta={<Meta title='Логин' description='' />}>
      <Row justify='center' style={{ padding: '1% 0' }}>
        <Col xs={24} md={8}>
          <Card>
            <AuthCardComponent />
          </Card>
        </Col>
      </Row>
    </Main>
  )
}

Login.displayName = 'Login'

export default Login
