import type { EntityKeyEnum, MessageModelProps } from '@/chat/models/Message'
import type { UsersModelProps } from '@/models/Users'
import type { PermissionRulesProps } from '@/services/base/types'

import { BaseModel } from './Base'

export type OwnerType = 'user' | 'assistant'
export enum WhoOwnerType {
  USER = 'Вы',
  ASSISTANT = 'Помощник',
}

export interface SelectionRequestActualProps {
  id: string | number
  user: UsersModelProps
  anonymous_user_id: string
  investment_objects: any[]
  messages: MessageModelProps[]
  is_actual: boolean
  permission_rules: PermissionRulesProps
  created_at: string
  updated_at: string
  bot_filter: typeof EntityKeyEnum
}
export interface SelectionRequestModelFilters {
  id: string | number
  created_at: string
  updated_at: string
  permissionRules: PermissionRulesProps
  contentType: string | number
  user: string
  user_email: string
  user_username: string
  user_first_name: string
  user_last_name: string
  user_middle_name: string
  selection_request: string
  owner_type: OwnerType
  text: string
  created_at_date: string
  updated_at_date: string
  anonymous_user_id: string
  is_actual: string
  name: string
  slug: string
  ordering?: string
  search?: string
  limit?: number
  offset?: number
}

export class SelectionRequestModel extends BaseModel {
  static modelName = 'selectionRequest'

  static url() {
    return '/personal-cabinet/selection-requests'
  }

  static actualUrl() {
    return `${this.url()}/actual/`
  }

  static completedUrl() {
    return `${this.url()}/completed/`
  }

  static downloadReportUrl(id: string | number) {
    return `${this.url()}/${id}/download/`
  }
}
