type NativeProps = Omit<
  React.HTMLAttributes<HTMLInputElement>,
  'label' | 'type'
>

export interface CheckboxProps extends NativeProps {
  label?: React.ReactNode
  disabled?: boolean
  checked?: boolean
}
