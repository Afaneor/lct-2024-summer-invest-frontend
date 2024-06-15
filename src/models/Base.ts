import type { PermissionRulesProps } from 'src/services/base/types'

export interface ExtraData {
  Город: string
  Метро: string
  Район: string
  Стоимость: string
  Окупаемость: string
  'Чистая прибыль': string
  'Причина продажи': string
  'Среднемес. выручка': string
  'Сфера деятельности': string
  'Организационно-правовая форма': string
}

export interface BaseModelProps {
  id: string | number
  created_at: string
  updated_at: string
  permissionRules: PermissionRulesProps
  contentType: string | number
}
export class BaseModel {
  static modelName = 'base'

  static url() {
    return ''
  }
}
