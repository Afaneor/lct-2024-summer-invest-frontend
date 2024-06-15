import { BaseModel } from 'src/models/Base'

import type { BaseModelProps } from '@/models/Base'

export enum BusinessType {
  LEGAL = 'legal',
  INDIVIDUAL = 'individual',
  PHYSICAL = 'physical',
}

export interface BusinessModelProps extends BaseModelProps {
  position: string // Должность пользователя в бизнесе
  type_business: BusinessType // Тип бизнеса
  inn: string // ИНН физического лица, ИП или компания
  sector?: number // Отрасль хозяйственной деятельности
  sub_sector?: number // Подотрасль хозяйственной деятельности
  territorial_location?: number // Территориальное положение бизнеса
  hid: string // Уникальный id контрагента в dadata
  short_business_name: string // Короткое название ИП или компании
  full_business_name: string // Полное название ИП или компании
  management_name: string // ФИО руководителя, только для компании
  management_position: string // Должность руководителя, только для компании
  full_opf: string // Полное наименование правовой формы
  short_opf: string // Короткое наименование правовой формы
  okved_code: string // ОКВЕД
  first_name: string // Имя
  last_name: string // Фамилия
  middle_name: string // Отчество
  address: string // Полный адрес
  country: string // Страна
  region: string // Город
  city_area: string // Область, округ
  city_district: string // Район
  phone: string // Телефон, относящийся к бизнесу
  email: string // Email, относящийся к бизнесу
  site: string // Сайт, относящийся к бизнесу
}

export class BusinessModel extends BaseModel {
  static modelName = 'business'

  static url() {
    return '/personal-cabinet/businesses'
  }

  static createBusinessByInnUrl() {
    return `${this.url()}/create-business-by-inn`
  }

  /**
   * Поля, которые будут отображаться в FetchMoreItemsComponent
   * для nested object нужно передать объект с названием поля и массивом ключей
   *
   */
  static mappingFields: (string | { territorial_location: string[] })[] = [
    'full_business_name',
    'position',
    'management_name',
    'inn',
    'email',
    'phone',
    'site',
    'address',
    'okved_code',
    'type_business',
    'region',
    'city_area',
    'city_district',
    { territorial_location: ['short_name'] },
    'sector',
    'sub_sector',
  ]
}
