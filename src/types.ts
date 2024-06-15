import type { FC, PropsWithChildren, SyntheticEvent } from 'react'

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/ban-types
export type FCC<P = {}> = FC<PropsWithChildren<P>>
export type Nullable<T> = T | null
export type HTMLElementEvent<T extends HTMLElement> = SyntheticEvent & {
  target: T
}

export interface ChoiceProps {
  value: string
  display_name: string
}

export type FieldTypeProps = 'string' | 'choice' | 'nested object'

export interface ChoicesProps {
  value: string
  display_name: string
}
export interface OptionProps<T> {
  label: string
  value: T
  max_length?: number
  read_only?: boolean
  required?: boolean
  type: FieldTypeProps
  choices?: ChoicesProps[]
}

/**
 * Тип который описывает модель в которой ключи это поля модели, а значения это объекты описывающие поля модели
 */
export type ModelOptionProps<M> = {
  [K in keyof M]: OptionProps<M[K]>
}

export interface ResponseData<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface AxiosResponse<T, R = ResponseData<T>> {
  config: Record<string, any>
  data: R
  headers: Record<string, unknown>
  request: XMLHttpRequest
  status: number
  statusText: string
}

export interface ReactQueryFetch<T> {
  data: AxiosResponse<T>
  isLoading: boolean
  refetch: CallableFunction | unknown
}
