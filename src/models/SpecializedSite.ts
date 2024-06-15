import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface SpecializedSiteModelProps extends BaseModelProps {
  name: string
}

export class SpecializedSiteModel extends BaseModel {
  static modelName = 'specializedSite'

  static url() {
    return ''
  }
}
