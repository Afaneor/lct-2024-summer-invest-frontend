import type { BaseModelProps } from '@/models/Base'
import { BaseModel } from '@/models/Base'

export interface PostModelProps extends BaseModelProps {
  preview_image: string
  title: string
  text: string
  tags: string[]
  is_published: boolean
}
export class PostModel extends BaseModel {
  static modelName = 'post'

  static url() {
    return '/blog/posts'
  }
}
