import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export interface InvestmentObjectsModelProps extends BaseModelProps {
  id: number
  external_id?: number
  main_photo_url: string
  photo_urls?: string[]
  name: string
  object_type?: number
  url: string
  extra_data?: Record<string, any>
  longitude?: string
  latitude?: string
  created_at: string
  updated_at: string
}

export interface InvestmentObjectsModelFilters {
  id: string
  name: string
  object_type: string
  url: string
  created_at_date: string
  updated_at_date: string
  ordering?: string
  search?: string
  limit?: number
  offset?: number
}

export class InvestmentObjectsModel extends BaseModel {
  static modelName = 'investmentObjects'

  static url() {
    return '/support/investment-objects'
  }
}
