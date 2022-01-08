export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  type: 'button' | 'reset' | 'submit'
  disabled?: boolean
}
