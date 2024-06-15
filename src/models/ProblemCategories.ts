import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'
import type { PermissionRulesProps } from '@/services/base/types'

export interface ProblemProps {
  id: number
  external_id: string
  name: string
  additional_info: string
  url: string
}

export interface ProblemThemeProps {
  id: number
  problems: ProblemProps[]
  external_id: string
  name: string
}

export interface ProblemSubcategoryProps {
  id: number
  problem_themes: ProblemThemeProps[]
  problem_category: number
  external_id: string
  name: string
}

export interface ProblemCategoriesModelProps extends BaseModelProps {
  name: string
  problem_subcategories: ProblemSubcategoryProps[]
  permission_rules: PermissionRulesProps
  created_at: string
  updated_at: string
}

export class ProblemCategoriesModel extends BaseModel {
  static modelName = 'problemCategories'

  static url() {
    return '/support/problem-categories/'
  }
}
