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
              <Card title='Быстрая оценка' className={'elevation'} hoverable>
                Введите параметры территории и получите моментальный результат.
                Оценка потенциала занимает всего несколько секунд.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Поддержка в принятии решений'
                className={'elevation'}
                hoverable
              >
                Используйте наши данные для более обоснованного принятия решений
                о вовлечении территорий в хозяйственный оборот.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Глубокая аналитика'
                className={'elevation'}
                hoverable
              >
                Наш анализ данных позволяет увидеть все аспекты использования
                территории. Вам не нужно искать информацию самостоятельно, мы
                уже сделали это за вас.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Мотивация к развитию'
                className={'elevation'}
                hoverable
              >
                Получите рекомендации по эффективному использованию территорий
                от экспертов и других пользователей.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Персонализированные отчёты'
                className={'elevation'}
                hoverable
              >
                Сгенерируйте отчет, основанный на ваших данных и наших анализах,
                для более точного планирования.
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card
                title='Актуальная информация'
                className={'elevation'}
                hoverable
              >
                Мы предоставляем свежие данные из проверенных источников о
                стоимости недвижимости и сопутствующих услугах.
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
