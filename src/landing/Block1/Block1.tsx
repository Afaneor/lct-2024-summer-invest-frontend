import React from 'react'
import styles from './Block1.module.scss'
import { Col, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import { BebasNeueTitle } from '@/components'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { Links } from '@/components/Header/Links'
const { Title } = Typography

const btnToCalc = { fontSize: 20, height: 50 }

export const Block1 = () => {
  return (
    <Row justify={'center'} className={styles.image}>
      <Col xs={23} md={20} style={{ alignSelf: 'center' }}>
        <Row gutter={[20, 20]}>
          <Col md={10} xs={24}>
            <Space direction={'vertical'}>
              <BebasNeueTitle
                title={
                  'Умный ассистент подбора и оценки территорий для вовлечения в хозяйственный оборот'
                }
              />
              <Title level={4} className={styles.subtitle}>
                '"Умный Ассистент: Территории для вашего бизнеса, оценка и
                подбор на высшем уровне!"'
              </Title>
              <Link href={Links.SMART_ASSISTANT.href}>
                <ButtonPrimaryRed
                  size={'large'}
                  shape={'round'}
                  type={'primary'}
                  style={btnToCalc}
                >
                  Воспользоваться ассистентом
                </ButtonPrimaryRed>
              </Link>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

Block1.displayName = 'Block1'

export default Block1
