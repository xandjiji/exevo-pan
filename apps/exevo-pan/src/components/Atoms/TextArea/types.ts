export type ExtendedProps = Omit<
  JSX.IntrinsicElements['textarea'],
  'aria-label'
>

export type CustomProps = {
  error?: boolean | string
  noAlert?: boolean
  noResize?: boolean
}

export type TextAreaProps = CustomProps & ExtendedProps & AccessibleLabelProps
