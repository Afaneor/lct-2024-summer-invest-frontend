import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface RealEstateModelProps extends BaseModelProps {
  name: string
}

export class RealEstateModel extends BaseModel {
  static modelName = 'realEstate'

  static url() {
    return ''
  }
}
