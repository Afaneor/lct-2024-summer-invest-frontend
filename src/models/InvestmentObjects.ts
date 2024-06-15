import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'
import type { ReadyBusinessModelProps } from '@/models/ReadyBusiness'
import type { RealEstateModelProps } from '@/models/RealEstate'
import type { SpecializedSiteModelProps } from '@/models/SpecializedSite'
import type { TenderLotModelProps } from '@/models/TenderLot'

export enum ObjectTypes {
  TENDER_LOT = 1,
  REAL_ESTATE = 2,
  TECHNOPARK = 'technopark',
  READY_BUSINESS = 'object_type',
}
export interface InvestmentObjectsModelProps extends BaseModelProps {
  external_id?: number
  main_photo_url: string
  photo_urls?: string[]
  name: string
  object_type?: ObjectTypes
  url: string
  extra_data?: Record<string, any>
  longitude?: string
  latitude?: string
  tender_lot: TenderLotModelProps
  real_estate: RealEstateModelProps
  specialized_site: SpecializedSiteModelProps
  ready_business: ReadyBusinessModelProps
  created_at: string
  updated_at: string
  investData?:
    | TenderLotModelProps
    | RealEstateModelProps
    | SpecializedSiteModelProps
    | ReadyBusinessModelProps
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
    return '/investment-object/investment-objects'
  }

  static additionalDataUrl() {
    return `${this.url()}/additional-data`
  }
}
