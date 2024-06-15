/**
 * хук для получения опций для полей из API
 */
import { useQueryCache } from 'src/hooks/useQueryCache'

export interface Choice {
  value: string
  displayName: string
}

/**
 * Получает опции для полей из API
 * @param from - название модели qKey в кэше реакт-квери
 * @param mapping - массив названий полей, для которых нужно получить опции, также задает порядок полей
 */
export const useApiOptions = (from: string, mapping?: string[]) => {
  const options: Record<string, any> = useQueryCache(`${from}Options`)
  /**
   * Объединяет опции из API с данными
   * В результате возвращает объект, где ключи - это названия полей, а значения - объекты данных
   * {
   *   field: {
   *     label: 'field',
   *     value: 'value'
   *     max_length: 255,
   *     read_only: false,
   *     required: false,
   *     type: 'string' | 'choice' | 'nested object'
   *   }
   * }
   * @param data
   */
  const mergeOptionsIntoData = (data: Record<string, any>) => {
    const result = {} as Record<string, any>
    const keys = mapping?.length ? mapping : Object.keys(data)
    keys.forEach((key) => {
      const option = options[key]
      let value = data[key]
      if (option) {
        // eslint-disable-next-line no-param-reassign
        // data[key] = options[k].choices.find((item: Choice) => item.value === v)?.displayName
        if (option.type === 'choice') {
          value = option.choices.find(
            (item: Choice) => item.value === value
          )?.display_name
        } else if (option.type === 'nested object') {
          value = value?.name
        }
        result[key] = {
          ...option,
          value,
        }
      } else {
        result[key] = {
          label: key,
          value,
        }
      }
    })
    return result
  }
  return { mergeOptionsIntoData, options }
}
