export type ExtendedProps = Omit<
  JSX.IntrinsicElements['textarea'],
  'aria-label'
>

export type CustomProps = {
  error?: boolean | string
  noResize?: boolean
}

export type TextAreaProps = CustomProps & ExtendedProps & AccessibleLabelProps
