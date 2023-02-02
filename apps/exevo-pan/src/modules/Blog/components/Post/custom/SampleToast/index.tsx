import clsx from 'clsx'
import { toast } from 'react-hot-toast'

type SampleToastProps = { message: string } & JSX.IntrinsicElements['button']

const SampleToast = ({ className, message, ...props }: SampleToastProps) => (
  <button
    type="button"
    className={clsx(
      className,
      'text-primaryHighlight inline cursor-pointer underline decoration-dashed underline-offset-4',
    )}
    onClick={() => toast.success(message)}
    {...props}
  />
)

export default SampleToast
