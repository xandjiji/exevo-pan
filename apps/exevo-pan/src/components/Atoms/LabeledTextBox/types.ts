import { HTMLAttributes } from 'react'

export interface LabeledTextBoxProps extends HTMLAttributes<HTMLDivElement> {
  labelText?: string
  warning?: boolean
}
