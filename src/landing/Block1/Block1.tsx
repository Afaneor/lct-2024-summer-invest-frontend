import React from 'react'
import styles from './Block1.module.scss'
import { Col, Row, Space, Typography } from 'antd'
import Link from 'next/link'
import { BebasNeueTitle } from '@/components/BebasNeueTitle'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { Links } from '@/components/Header/Links'
const { Title } = Typography

const btnToSA = { fontSize: 20, height: 50 }

export const Block1 = () => {
  return (
    <Row justify={'center'} className={styles.image}>
      <Col xs={23} md={20} style={{ alignSelf: 'center' }}>
        <Row gutter={[20, 20]}>
          <Col md={10} xs={24}>
            <Space direction={'vertical'}>
              <BebasNeueTitle
                className={styles.mainTitle}
                title={
                  'Умный помощник по комплексному подбору инвестиционных площадок'
                }
              />
              <Title level={4} className={styles.subtitle}>
                Ваш надежный путь к успешным инвестициям
              </Title>
              <Link href={Links.SMART_ASSISTANT.href}>
                <ButtonPrimaryRed
                  size={'large'}
                  shape={'round'}
                  type={'primary'}
                  style={btnToSA}
                >
                  Воспользоваться помощником
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
