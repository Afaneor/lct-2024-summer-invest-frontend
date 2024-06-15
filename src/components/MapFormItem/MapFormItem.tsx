import React from 'react'

import type { PropsFormItem } from '@/components'
import { FormItem } from '@/components'
import type { FCC } from '@/types'

interface MapFormItemProps extends PropsFormItem {
  onCreatePolygone?: (selectedPolygonsInMeters: number) => void
}
const MapFormItem: FCC<MapFormItemProps> = ({ onCreatePolygone }) => {
  return (
    <FormItem name='territorial_locations' shouldUpdate>
      <button
        type='button'
        onClick={() => {
          onCreatePolygone?.(100)
        }}
      >
        Создать полигон
      </button>
      Тут будет карта
    </FormItem>
  )
}

MapFormItem.displayName = 'MapFormItem'

export default MapFormItem
