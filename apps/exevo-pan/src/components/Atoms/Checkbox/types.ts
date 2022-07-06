type NativeProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'label' | 'type'
>

export interface CheckboxProps extends NativeProps {
  label?: React.ReactNode
  disabled?: boolean
  checked?: boolean
  enabledStyle?: boolean
  greenVariant?: boolean
}
