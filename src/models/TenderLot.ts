import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface TenderLotModelProps extends BaseModelProps {
  name: string
}

export class TenderLotModel extends BaseModel {
  static modelName = 'tenderLot'

  static url() {
    return ''
  }
}
