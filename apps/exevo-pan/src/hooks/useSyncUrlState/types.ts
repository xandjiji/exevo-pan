export type RegisteredParameter<Type> = {
  key: string
  defaultValue: Type
  encode?: (value: Type) => string
  decode?: (value: string) => Type
}

export type UseSyncUrlState<Type> = {
  value?: Type
} & RegisteredParameter<Type>
