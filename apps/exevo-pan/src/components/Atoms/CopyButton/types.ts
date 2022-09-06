export type CopyButtonProps = {
  copyString: string
  linkIcon?: boolean
  variant?: 'big' | 'small' | 'default'
} & JSX.IntrinsicElements['button']
