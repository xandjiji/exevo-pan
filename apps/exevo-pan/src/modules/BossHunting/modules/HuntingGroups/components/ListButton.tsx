import { Button } from 'components/Atoms'
import { ChevronDownIcon } from 'assets/svgs'

interface ListButtonProps extends React.ComponentProps<'button'> {
  isLoading?: boolean
  onClick: () => void
}

const ListButton = ({
  isLoading = false,
  disabled,
  children,
  ...props
}: ListButtonProps) => (
  <Button hollow pill disabled={disabled || isLoading} {...props}>
    {isLoading ? (
      <div role="alert" className="loading-spinner fill-onPrimary h-6 w-6" />
    ) : (
      <>
        <ChevronDownIcon className="h-6 w-6" />
        {children}
      </>
    )}
  </Button>
)

export default ListButton
