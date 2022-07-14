export type ExtendedProps = Omit<
  JSX.IntrinsicElements['textarea'],
  'aria-label'
>

export type CustomProps = {
  error?: boolean | string
}

export type TextAreaProps = CustomProps & ExtendedProps & AccessibleLabelProps
