import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'
import type { PermissionRulesProps } from '@/services/base/types'

export interface UsersModelProps extends BaseModelProps {
  username: string
  avatar: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  full_name: string
  middle_name: string
  is_need_add_info: true
  permission_rules: PermissionRulesProps
}

export class UsersModel extends BaseModel {
  static modelName = 'users'

  static url() {
    return '/user/users'
  }

  static changePasswordUrl() {
    return `${this.url()}/change-password/`
  }
}
