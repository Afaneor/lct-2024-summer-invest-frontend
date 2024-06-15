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

export type ModelOptionProps<M> = {
  [K in keyof M]: OptionProps<M[K]>
}
