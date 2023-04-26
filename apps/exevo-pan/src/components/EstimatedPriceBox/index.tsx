import clsx from 'clsx'
import { useTranslations, templateString } from 'contexts/useTranslation'
import { LabeledTextBox, Text, Skeleton, Shine } from 'components/Atoms'

export type EstimatedPriceBoxProps = {
  label?: string
  loading?: boolean
  estimatedValue?: number
  similarCount?: number
} & JSX.IntrinsicElements['div']

const EstimatedPriceBox = ({
  label,
  loading = false,
  similarCount = 0,
  estimatedValue,
  ...props
}: EstimatedPriceBoxProps) => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.EstimatedPriceBox

  return (
    <div {...props}>
      <LabeledTextBox
        labelText={label ?? i18n.label}
        warning={similarCount === 0}
        className="text-s bg-surface flex items-center gap-1"
      >
        {loading ? (
          <Skeleton className="h-4 w-full animate-pulse">
            <Shine animationIterationCount="infinite" width={60} />
          </Skeleton>
        ) : estimatedValue === undefined ? (
          <span className="mx-auto tracking-wider">?????</span>
        ) : estimatedValue === -1 ? (
          <span className="text-rare mx-auto font-bold tracking-wider">
            ?????
          </span>
        ) : (
          <Text.TibiaCoin value={estimatedValue} className="animate-fadeIn" />
        )}
      </LabeledTextBox>

      <span
        className={clsx(
          'xs:-mb-2 mt-1 block w-full text-right text-xs',
          loading ? 'opacity-0' : 'animate-fadeIn',
        )}
        role={loading ? 'none' : undefined}
      >
        {templateString(
          similarCount === 1 ? i18n.similarFound : i18n.similarFoundPlural,
          {
            count: similarCount,
          },
        )}
      </span>
    </div>
  )
}

export default EstimatedPriceBox
