/**
 * Получаем человекопонятное название чойса
 */
import { useQueryCache } from 'src/hooks/useQueryCache'

export interface Choice {
  value: string
  displayName: string
}

export const useApiOptions = (from: string, mapping: string[]) => {
  const options: Record<string, any> = useQueryCache(`${from}Options`)

  const mergeOptionsIntoData = (data: Record<string, any>) => {
    const result = {} as Record<string, any>
    if (options) {
      mapping.forEach((m) => {
        const option = options[m]
        if (option) {
          let value = data[m]
          // eslint-disable-next-line no-param-reassign
          // data[key] = options[k].choices.find((item: Choice) => item.value === v)?.displayName
          if (option.type === 'choice') {
            value = option.choices.find(
              (item: Choice) => item.value === value
            )?.display_name
          } else if (option.type === 'nested object') {
            value = value?.name
          }
          result[m] = {
            ...option,
            value,
          }
        }
      })
    }
    return result
  }
  return { mergeOptionsIntoData, options }
}
