export interface ParamRegister {
  key: string
  defaultValue: any
  encode: (value: any) => string
  decode: (value: string) => any
}

export type ParameterObject = Record<string, any>
