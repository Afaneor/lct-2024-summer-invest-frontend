import type { FormInstance } from 'antd'
import { Card, Col, Form, Row } from 'antd'
import React, { type BaseSyntheticEvent } from 'react'
import type { FCC } from 'src/types'

import { BebasNeueTitle } from '@/components'
import { LandAreaFormItem } from '@/components/LandAreaFormItem'
import { PropertyTypeFormItem } from '@/components/PropertyTypeFormItem'
import { TypeTaxSystemFormItem } from '@/components/TypeTaxSystemFormItem'

import ButtonPrimaryRed from '../ButtonPrimaryRed/ButtonPrimaryRed'
import EquipmentFormItem from '../EquipmentFormItem/EquipmentFormItem'
import FormItemObjectArea from '../FormItemObjectArea/FormItemObjectArea'
import FormItemObjectType from '../FormItemObjectType/FormItemObjectType'
import FormItemPrice from '../FormItemPrice/FormItemPrice'
import SectorFormItem from '../SectorFormItem/SectorFormItem'
import StaffFormItem from '../StaffFormItem/StaffFormItem'

interface CardSearchFiltersProps {
  form: FormInstance
  onChange?: (evt: BaseSyntheticEvent) => void
}
const filterStyle = { marginTop: 10, marginBottom: 10 }

const CardSearchFilters: FCC<CardSearchFiltersProps> = ({ form }) => {
  const [errors] = React.useState({} as any)
  return (
    <Card style={filterStyle}>
      <BebasNeueTitle title='Поиск' level={3} />
      <Row gutter={[20, 20]} justify='center'>
        <Col xs={24} md={18}>
          <Form
            form={form}
            name='calculator'
            labelCol={{ span: 10 }}
            labelAlign='left'
            initialValues={{}}
            autoComplete='off'
            onFinish={() => {
              //
            }}
            onFinishFailed={() => {
              // router.push('#main-investment-params')
            }}
          >
            <FormItemObjectType />
            <FormItemPrice />
            <FormItemObjectArea />
            <TypeTaxSystemFormItem errors={errors.type_tax_system} />
            <SectorFormItem errors={errors.sector} />
            <LandAreaFormItem
              errorsToLandArea={errors.to_land_area}
              errorsFromLandArea={errors.from_land_area}
            />
            <StaffFormItem
              errorsFromStaff={errors.from_staff}
              errorsToStaff={errors.to_staff}
            />
            <EquipmentFormItem errors={errors.equipment} />
            <PropertyTypeFormItem />
          </Form>
        </Col>
      </Row>
      <Row gutter={[20, 20]} justify='center'>
        <Col>
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
