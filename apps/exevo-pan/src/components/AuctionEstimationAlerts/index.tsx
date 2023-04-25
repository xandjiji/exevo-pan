import { Alert, Text, ExevoProLink } from 'components/Atoms'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { auctionEstimations } from 'Constants'

type AlertProps = JSX.IntrinsicElements['div']

const Disclaimer = (args: AlertProps) => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.AuctionEstimationAlerts.Disclaimer

  return (
    <Alert variant="primary" noIcon {...args}>
      <p className="mb-2">
        {templateMessage(i18n.first, {
          subjective: <strong>{i18n.subjective}</strong>,
        })}
      </p>

      <p>{i18n.second}</p>

      <ul className="marker:text-primaryHighlight grid list-inside list-disc">
        <li>{i18n.server}</li>
        <li>{i18n.character}</li>
      </ul>
    </Alert>
  )
}

const Failed = (args: AlertProps) => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.AuctionEstimationAlerts.Failed

  return (
    <Alert variant="alert" {...args}>
      {i18n.message}
    </Alert>
  )
}

const ProOnly = (args: AlertProps) => {
  const {
    translations: { common },
  } = useTranslations()
  const i18n = common.AuctionEstimationAlerts.ProOnly

  return (
    <Alert variant="primary" noIcon {...args}>
      {templateMessage(i18n.message, {
        freeCap: <Text.TibiaCoin value={auctionEstimations.MAX_FREE_VALUE} />,
        exevoPro: <ExevoProLink />,
      })}
    </Alert>
  )
}

export default { Disclaimer, Failed, ProOnly }
