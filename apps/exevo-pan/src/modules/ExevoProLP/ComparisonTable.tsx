/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import { useTranslations, templateMessage } from 'contexts/useTranslation'
import { Text } from 'components/Atoms'
import { CheckBoxIcon, EmptyCheckBoxIcon } from 'assets/svgs'
import { auctionEstimations } from 'Constants'
import Strong from './Strong'
import { PremiumBossesList, PremiumFiltersList } from './Tooltip'

const TitleRow = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <tr>
    <td
      className={clsx(
        className,
        'text-onSurface pt-6 pb-2 text-left text-2xl font-bold',
      )}
      {...props}
    />
  </tr>
)

const Row = ({ className, ...props }: React.ComponentProps<'tr'>) => (
  <tr
    className={clsx(
      className,
      'even:bg-separator/10 odd:bg-separator/5 text-s child:py-3 child:px-4',
    )}
    {...props}
  />
)

const Feature = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <td className={clsx(className, 'font-light')} {...props} />
)

const Check = ({ empty = false }) => (
  <Feature>
    {empty ? (
      <EmptyCheckBoxIcon className="fill-separator h-6 w-6" />
    ) : (
      <CheckBoxIcon className="fill-primaryHighlight h-6 w-6" />
    )}
  </Feature>
)

const ComparisonTable = () => {
  const translations = useTranslations()
  const i18n = translations.exevopro.ComparisonTable

  return (
    <section className="custom-scrollbar max-w-full overflow-auto pb-2 sm:pb-0">
      <table className="mx-auto text-center">
        <tr className="text-[32px]">
          <th style={{ width: 160 }} />
          <th>{i18n.free}</th>
          <th className="rare-gradient-text whitespace-nowrap">Exevo Pro</th>
        </tr>

        <TitleRow className="!pt-0">{i18n.auctions}</TitleRow>

        <Row>
          <td>{i18n.auctionFilters}</td>
          <Feature>{i18n.regularFilters}</Feature>
          <Feature>
            <PremiumFiltersList>
              <Strong highlight>{i18n.premiumFilters}</Strong>
            </PremiumFiltersList>
          </Feature>
        </Row>
        <Row>
          <td>{i18n.history}</td>
          <Check />
          <Check />
        </Row>
        <Row>
          <td>{i18n.scheduleNotifications}</td>
          <Check />
          <Check />
        </Row>
        <Row>
          <td>{i18n.bidNotifications}</td>
          <Check empty />
          <Check />
        </Row>
        <Row>
          <td>{i18n.highlightDiscounts}</td>
          <Check empty />
          <Check />
        </Row>
        <Row>
          <td>{i18n.tibiaCoinsInvested}</td>
          <Check empty />
          <Check />
        </Row>
        <Row>
          <td>{i18n.auctionPriceEstimations}</td>
          <Feature style={{ maxWidth: 144 }}>
            {templateMessage(i18n.estimationFree, {
              maxValue: (
                <Text.TibiaCoin value={auctionEstimations.MAX_FREE_VALUE} />
              ),
            })}
          </Feature>
          <Check />
        </Row>

        <TitleRow>{i18n.bosses}</TitleRow>

        <Row>
          <td>{i18n.bossSpawnChances}</td>
          <Feature>{i18n.regularBosses}</Feature>
          <Feature>
            <PremiumBossesList>
              <Strong highlight>{i18n.premiumBosses}</Strong>
            </PremiumBossesList>
          </Feature>
        </Row>
        <Row>
          <td>{i18n.huntingGroups}</td>
          <Check />
          <Check />
        </Row>
        <Row>
          <td>{i18n.privateGroups}</td>
          <Check empty />
          <Check />
        </Row>
      </table>
    </section>
  )
}

export default ComparisonTable
