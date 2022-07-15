export type ExtendedProps = Omit<
  JSX.IntrinsicElements['span'],
  'id' | 'role' | 'aria-hidden'
>

export type CustomProps = {
  id: string
  error?: boolean | string
}

export type FormErrorProps = ExtendedProps & CustomProps
