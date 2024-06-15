import { useMemo } from 'react'

import type { EntityKeyEnum } from '@/chat/models/Message'

/**
 * Хук для установки фильтрации по типу сущности
 * также возвращает данные фильтры по ключу
 * @param key - ключ сущности (service_support, investment_object, category_problem)
 * @param filter - фильтры объект из контекста
 * @param setChatFilter - функция установки фильтров
 */
export const useEntityTypeFilter = (
  key: keyof typeof EntityKeyEnum,
  filter: Record<string, any>,
  setChatFilter: any
) => {
  const shortFilter = useMemo(() => {
    return filter?.[key]
  }, [filter?.[key]])

  const handleSetFilter = (filterObj: Record<string, string>) => {
    setChatFilter({
      ...filter,
      [key]: {
        ...shortFilter,
        ...filterObj,
      },
    })
  }
  return { shortFilter, handleSetFilter }
}
