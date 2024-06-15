import { MailOutlined, PhoneOutlined } from '@ant-design/icons'
import { Col, Row, Space } from 'antd'
import React from 'react'

import { BebasNeueTitle } from '@/components'
import { PageCardContainer } from '@/components/PageCardContainer'
import MyProfileLayout from '@/templates/MyProfileLayout'

const iconsStyle = {
  fontSize: '20px',
}
const MyProfileInfo = () => {
  return (
    <MyProfileLayout>
      <PageCardContainer title='Ваши персональные данные'>
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <BebasNeueTitle
              title='Соколов Игорь Владимирович'
              level={4}
              style={{
                color: '#ef0f33',
              }}
            />
          </Col>
          <Col span={24}>
            <Space direction='horizontal' align='baseline'>
              <PhoneOutlined style={iconsStyle} />
              <BebasNeueTitle title='+7 (999) 999-99-99' level={4} />
            </Space>
          </Col>
          <Col span={24}>
            <Space direction='horizontal' align='baseline'>
              <MailOutlined style={iconsStyle} />
              <BebasNeueTitle title='1@1.ru' level={4} />
            </Space>
          </Col>
        </Row>
      </PageCardContainer>
    </MyProfileLayout>
  )
}

export default MyProfileInfo
