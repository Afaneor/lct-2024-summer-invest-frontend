import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'
import type { UsersModelProps } from '@/models/Users'

export interface CommentModelProps extends BaseModelProps {
  text: string
  content_type: null | string
  object_id: null | string
  user: UsersModelProps
}

export class CommentModel extends BaseModel {
  static modelName = 'comment'

  static url() {
    return '/service-interaction/comments'
  }
}
