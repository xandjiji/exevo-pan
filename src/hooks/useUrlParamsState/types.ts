import { ParameterObject } from 'utils/urlParameterState/types'

export type UseUrlParamsGetterSetter = [
  ParameterObject,
  (
    newState:
      | ParameterObject
      | ((previousState: ParameterObject) => ParameterObject),
  ) => void,
]
