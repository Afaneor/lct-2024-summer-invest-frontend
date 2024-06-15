import type { BaseModelProps, ExtraData } from 'src/models/Base'
import { BaseModel } from 'src/models/Base'

export interface ReadyBusinessModelProps extends BaseModelProps {
  external_id: number
  name: string
  description: string
  extra_data: ExtraData
}

export class ReadyBusinessModel extends BaseModel {
  static modelName = 'readyBusiness'

  static url() {
    return ''
  }
}
