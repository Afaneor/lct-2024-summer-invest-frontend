import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface SubscriptionModelProps extends BaseModelProps {
  subscription_type: string
  telegram_username: string
  email: string
}

export interface SubscriptionDataForFilterProps {
  investment_object: string
  service_support: string
  topic: string
  event: string
}

export class SubscriptionModel extends BaseModel {
  static modelName = 'subscription'

  static url() {
    return '/personal-cabinet/subscriptions'
  }

  static additionalDataUrl() {
    return `${this.url()}/additional-data`
  }
}
