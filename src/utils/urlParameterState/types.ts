export interface ParamRegister<T> {
  key: string
  defaultValue: T
  encode: (value: T) => string
  decode: (value: string) => T
}

export type ParameterObject<T> = Record<string, T>
