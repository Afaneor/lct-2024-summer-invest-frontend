import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface BusinessModelProps extends BaseModelProps {
  name: string
}

export class BusinessModel extends BaseModel {
  static modelName = 'business'

  static url() {
    return '/person-cabinet/businesses'
  }
}
