export type CopyButtonProps = {
  copyString: string
  linkIcon?: boolean
  variant?: 'big' | 'small' | 'default'
  iconClassname?: string
} & JSX.IntrinsicElements['button']
