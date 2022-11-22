declare type KeysOfType<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never
}[keyof T]

declare type FilterProperties<T, V> = Pick<T, KeysOfType<T, V>>

type ExtractReducerActionNames<Action extends { type: string }> = Action['type']

type ExtractReducerActionArgs<
  Actions extends { type: string },
  ActionName extends ExtractReducerActionNames<Actions>,
> = Omit<Extract<Actions, { type: ActionName }>, 'type'>

declare type ReducerObject<Actions extends { type: string }, ReducerState> = {
  [ActionName in ExtractReducerActionNames<Actions>]: (
    currentState: ReducerState,
    args: ExtractReducerActionArgs<Actions, ActionName>,
  ) => ReducerState
}
