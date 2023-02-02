import NextNProgress from 'nextjs-progressbar'
import { useTheme } from 'contexts/useTheme'

const NavigationProgress = () => {
  const { colors } = useTheme()

  return (
    <NextNProgress
      color={colors.primaryHighlight}
      options={{ showSpinner: false }}
    />
  )
}

export default NavigationProgress
