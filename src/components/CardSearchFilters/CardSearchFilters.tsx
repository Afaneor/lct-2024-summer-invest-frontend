import { Card, Col, Row } from 'antd'
import React, { type BaseSyntheticEvent } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { SelectSearchableAsync } from '@/components/SelectSearchableAsync'
import { TerritorialLocationModel } from '@/models'

import ButtonPrimaryRed from '../ButtonPrimaryRed/ButtonPrimaryRed'

interface CardSearchFiltersProps {
  onChange?: (evt: BaseSyntheticEvent) => void
}
const filterStyle = { marginTop: 10, marginBottom: 10 }

const CardSearchFilters: FCC<CardSearchFiltersProps> = ({ onChange }) => {
  return (
    <Card style={filterStyle}>
      <BebasNeueTitle title='Поиск' level={3} />

      <Row gutter={[20, 20]}>
        <Col xs={24} md={10}>
          <SelectSearchableAsync
            model={TerritorialLocationModel}
            placeholder='Выберите округ'
            listItemsNameKey='full_name'
            single
            onChange={onChange}
          />
        </Col>
        <Col xs={24} md={10}>
          <SelectSearchableAsync
            model={TerritorialLocationModel}
            placeholder='Выберите округ'
            listItemsNameKey='full_name'
            single
            onChange={onChange}
          />
        </Col>
        <Col xs={24} md={10}>
          <SelectSearchableAsync
            model={TerritorialLocationModel}
            placeholder='Выберите округ'
            listItemsNameKey='full_name'
            single
            onChange={onChange}
          />
        </Col>
        <Col xs={24} md={10}>
          <SelectSearchableAsync
            model={TerritorialLocationModel}
            placeholder='Выберите округ'
            listItemsNameKey='full_name'
            single
            onChange={onChange}
          />
        </Col>
        <Col span={24}>
          <ButtonPrimaryRed
            size='large'
            style={{
              minWidth: '150px',
            }}
          >
            Найти
          </ButtonPrimaryRed>
        </Col>
      </Row>
    </Card>
  )
}

CardSearchFilters.displayName = 'CardSearchFilters'

export default CardSearchFilters
