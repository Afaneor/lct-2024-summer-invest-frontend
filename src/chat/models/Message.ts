import type { PermissionRulesProps } from '../../services/base/types'
import type { OwnerType } from '../types'

export enum OwnerTypeEnum {
  USER = 'user',
  BOT = 'bot',
}

export interface NewMessageModelProps {
  owner_type: OwnerType
  selection_request: string
  text: string
  parent?: number
}

export interface MessageModelProps {
  id: string | number
  created_at?: string
  updated_at?: string
  permissionRules?: PermissionRulesProps
  contentType?: string | number
  user?: string
  user_email?: string
  user_username?: string
  user_first_name?: string
  user_last_name?: string
  user_middle_name?: string
  selection_request?: string
  owner_type: OwnerTypeEnum
  text: string
  created_at_date?: string
  updated_at_date?: string
}

export class MessageModel {
  static modelName = 'message'

  static url() {
    return '/personal-cabinet/messages/'
  }
}
