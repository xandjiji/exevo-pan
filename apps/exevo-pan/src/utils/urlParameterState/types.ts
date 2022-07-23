/* @ ToDo: fix this typings */
export interface ParamRegister<Type> {
  key: string
  defaultValue: Type
  encode?: (value: Type) => string
  decode?: (value: string) => Type
}

export type ParameterObject = Record<string, any>

export interface urlParameterStateObject {
  getUrlValues: () => ParameterObject
  setUrlValues: (newValues: ParameterObject) => void
  isCurrentlyDefaultValues: () => boolean
  defaultValues: ParameterObject
}
