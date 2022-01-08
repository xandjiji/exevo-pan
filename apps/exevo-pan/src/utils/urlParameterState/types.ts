/* @ ToDo: fix this typings */
export interface ParamRegister {
  key: string
  defaultValue: any
  encode?: (value: any) => string
  decode?: (value: string) => any
}

export type ParameterObject = Record<string, any>

export interface urlParameterStateObject {
  getUrlValues: () => ParameterObject
  setUrlValues: (newValues: ParameterObject) => void
  isCurrentlyDefaultValues: () => boolean
  defaultValues: ParameterObject
}
