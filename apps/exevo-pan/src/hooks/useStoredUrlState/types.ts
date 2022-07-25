import { RegisteredParameter } from '../useSyncUrlState/types'

export type UseStoredUrlStateProps<T> = {
  storeKey: string
} & RegisteredParameter<T>
