import { MailOutlined } from '@ant-design/icons'
import { Col, Row, Space } from 'antd'
import React, { useContext } from 'react'

import { BebasNeueTitle } from '@/components'
import { CurrentUserContext } from '@/components/CurrentUserProvider/CurrentUserProvider'
import { PageCardContainer } from '@/components/PageCardContainer'
import withAuth from '@/pages/HOC'
import MyProfileLayout from '@/templates/MyProfileLayout'

const iconsStyle = {
  fontSize: '20px',
}
const MyProfileInfo = () => {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <MyProfileLayout>
      <PageCardContainer title='Ваши персональные данные'>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <BebasNeueTitle
              title={
                currentUser?.full_name ||
                currentUser?.first_name ||
                currentUser?.email
              }
              level={4}
              style={{
                color: '#ef0f33',
              }}
            />
          </Col>
          <Col span={24}>
            <Space direction='horizontal' align='baseline'>
              <MailOutlined style={iconsStyle} />
              <BebasNeueTitle title={currentUser?.email} level={4} />
            </Space>
          </Col>
        </Row>
      </PageCardContainer>
    </MyProfileLayout>
  )
}

export default withAuth(MyProfileInfo)
