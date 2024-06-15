import React from 'react'
import styles from './Block2.module.scss'
import { Card, Col, Row, Typography } from 'antd'
import Link from 'next/link'
import { ButtonPrimaryRed } from '@/components/ButtonPrimaryRed'
import { Links } from '@/components/Header/Links'
const { Title } = Typography

export const Block2 = () => {
  return (
    <div id='what' className={styles.container}>
      <Row style={{ paddingTop: '30px' }} justify={'center'}>
        <Title>Что вы получаете?</Title>
      </Row>
      <Row justify={'center'}>
        <Col xs={24} md={18}>
          <Row gutter={[20, 20]}>
            <Col xs={24} md={12}>
              <Card
                title='Персонализированные рекомендации'
                className={'elevation'}
                hoverable
              >
                Индивидуальные инвестиционные советы и подбор площадок,
                соответствующих вашим финансовым целям и инвестиционным
                предпочтениям.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title='Экономия времени' className={'elevation'} hoverable>
                Сокращайте время на поиск и анализ инвестиционных площадок, мы
                предоставляем готовые решения и отчеты, что позволяет
                сосредоточиться на других важных задачах.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Доступ к эксклюзивным данным и аналитике'
                className={'elevation'}
                hoverable
              >
                Получите доступ к уникальным данным и аналитическим отчетам, что
                помогает принимать более обоснованные решения.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Повышенная безопасность инвестиций'
                className={'elevation'}
                hoverable
              >
                Мы используем сложные алгоритмы и методы анализа для выявления
                потенциальных рисков, что повышает безопасность и надежность
                инвестиций.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Персонализированные отчёты'
                className={'elevation'}
                hoverable
              >
                Сгенерируйте отчет, основанный на ваших данных и нашем анализе,
                для принятия правильного решения.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Актуальная информация'
                className={'elevation'}
                hoverable
              >
                Мы предоставляем свежие данные из проверенных источников, что
                помогает принимать взвешенные решения на основе актуальной
                информации.
              </Card>
            </Col>
            <Col span={24} style={{ textAlign: 'center', padding: '10px' }}>
              <Link href={Links.SMART_ASSISTANT.href}>
                <ButtonPrimaryRed
                  size={'large'}
                  shape={'round'}
                  type={'primary'}
                >
                  Попробовать
                </ButtonPrimaryRed>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

Block2.displayName = 'Block1'

export default Block2
