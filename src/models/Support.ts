import type { BaseModelProps } from '@/models/Base'
import { BaseModel } from '@/models/Base'
import type { PermissionRulesProps } from '@/services/base/types'

interface EconomicActivityProps {
  id: number
  code: string
  name: string
}

interface RestrictionProps {
  id: number
  name: string
}
export interface SupportFiltersData {
  support_type: string[]
  support_level: string[]
  msp_roster: string[]
  economic_activity_name: string[]
}

export interface SupportModelProps extends BaseModelProps {
  id: number
  region: string
  type_service_support: string
  name: string
  support_type: string
  support_level: string
  description: string
  legal_act: string
  url_legal_act: string
  url_application_form: string
  name_responsible_body: string
  economic_activities: EconomicActivityProps[]
  restrictions: RestrictionProps[]
  is_msp_roster: boolean
  applicant_requirement: string
  applicant_procedure: string
  required_document: string
  permission_rules: PermissionRulesProps
  created_at: string
  updated_at: string
  economic_activity_code: string[]
}

export const CONTENT_TYPE = 43
export class SupportModel extends BaseModel {
  static modelName = 'serviceSupport'

  static url() {
    return '/support/service-supports'
  }

  static dataForFiltersUrl() {
    return `${this.url()}/data-for-filters`
  }
}
