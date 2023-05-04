/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import { Text } from 'components/Atoms'
import { CheckBoxIcon, EmptyCheckBoxIcon } from 'assets/svgs'
import { auctionEstimations } from 'Constants'
import Strong from './Strong'

const TitleRow = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <tr className="after:bg-separator/50 relative after:absolute after:bottom-1 after:left-0 after:h-[1px] after:w-full">
    <td
      className={clsx(
        className,
        'text-onSurface py-4 text-left text-2xl font-bold',
      )}
      {...props}
    />
  </tr>
)

const Row = ({ className, ...props }: React.ComponentProps<'tr'>) => (
  <tr
    className={clsx(
      className,
      'even:after:bg-separator/10 text-s child:py-3 child:px-4 after:-z-1 relative after:absolute after:top-0 after:left-0 after:h-full after:w-full',
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
      <EmptyCheckBoxIcon className="fill-separator" />
    ) : (
      <CheckBoxIcon className="fill-primaryHighlight" />
    )}
  </Feature>
)

const ComparisonTable = () => {
  console.log(9)

  return (
    <table className="mx-auto text-center">
      <tr className="text-[32px]">
        <th style={{ width: 160 }} />
        <th>Free</th>
        <th className="rare-gradient-text whitespace-nowrap">Exevo Pro</th>
      </tr>

      <TitleRow className="pt-0">Auctions</TitleRow>

      <Row>
        <td>Auction filters</td>
        <Feature>Regular filters</Feature>
        <Feature>
          <Strong highlight>Premium filters</Strong>
        </Feature>
      </Row>
      <Row>
        <td>Char Bazaar history</td>
        <Check />
        <Check />
      </Row>
      <Row>
        <td>Schedule auction notifications</td>
        <Check />
        <Check />
      </Row>
      <Row>
        <td>Auction bid notifications</td>
        <Check empty />
        <Check />
      </Row>
      <Row>
        <td>Highlight auction discounts</td>
        <Check empty />
        <Check />
      </Row>
      <Row>
        <td>Tibia Coins invested on each character</td>
        <Check empty />
        <Check />
      </Row>
      <Row>
        <td>Auction price estimations</td>
        <Feature style={{ maxWidth: 144 }}>
          Up to <Text.TibiaCoin value={auctionEstimations.MAX_FREE_VALUE} />{' '}
          auction value
        </Feature>
        <Check />
      </Row>

      <TitleRow>Bosses</TitleRow>

      <Row>
        <td>Boss spawn chances</td>
        <Feature>Regular bosses</Feature>
        <Feature>
          <Strong highlight>Premium bosses</Strong>
        </Feature>
      </Row>
      <Row>
        <td>Hunting groups check and notification system</td>
        <Check />
        <Check />
      </Row>
      <Row>
        <td>Private hunting groups</td>
        <Check empty />
        <Check />
      </Row>
    </table>
  )
}

export default ComparisonTable
