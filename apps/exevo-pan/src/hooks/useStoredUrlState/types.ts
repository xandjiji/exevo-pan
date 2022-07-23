import { RegisteredParameter } from '../useSynchUrlState/types'

export type UseStoredUrlStateProps<T> = {
  storeKey: string
} & RegisteredParameter<T>
