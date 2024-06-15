import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface EventTypeEnum {
  webinar: 'webinar'
  meeting: 'meeting'
}
export interface EventModelProps extends BaseModelProps {
  photo: null | string
  name: string
  event_datetime: string
  description: string
  event_type: string
}

export class EventModel extends BaseModel {
  static modelName = 'event'

  static url() {
    return '/service-interaction/events'
  }
}
