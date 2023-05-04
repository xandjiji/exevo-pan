/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import { Text } from 'components/Atoms'
import { CheckBoxIcon, EmptyCheckBoxIcon } from 'assets/svgs'
import { auctionEstimations } from 'Constants'

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

const Feature = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <td className={clsx(className, 'text-s w-24 font-light')} {...props} />
)

const Check = ({ empty = false }) => (
  <td className="child:align-middle">
    {empty ? (
      <EmptyCheckBoxIcon className="fill-separator" />
    ) : (
      <CheckBoxIcon className="fill-primaryHighlight" />
    )}
  </td>
)

const Strong = ({ className, ...props }: React.ComponentProps<'strong'>) => (
  <strong className={clsx(className, 'text-rare')} {...props} />
)

const ComparisonTable = () => {
  console.log(9)

  return (
    <table
      className="mx-auto w-fit text-center"
      style={{ borderSpacing: '32px 8px' }}
    >
      <tr className="text-[32px]">
        <th style={{ width: 160 }} />
        <th>Free</th>
        <th className="rare-gradient-text">Exevo Pro</th>
      </tr>

      <TitleRow>Auctions</TitleRow>

      <tr>
        <td>Auction filters</td>
        <Feature>Regular filters</Feature>
        <Feature>
          <Strong>Premium</Strong> filters
        </Feature>
      </tr>
      <tr>
        <td>Auction notifications</td>
        <Feature>Schedule notifications</Feature>
        <Feature>
          <p className="text-center">Schedule notifications</p> <p>+</p>{' '}
          <p>
            <Strong>notifications on bid</Strong>
          </p>
        </Feature>
      </tr>
      <tr>
        <td>Highlight auction discounts</td>
        <Check empty />
        <Check />
      </tr>
      <tr>
        <td>Tibia Coins invested on each character</td>
        <Check empty />
        <Check />
      </tr>
      <tr>
        <td>Auction price estimations</td>
        <Feature>
          Up to <Text.TibiaCoin value={auctionEstimations.MAX_FREE_VALUE} />{' '}
          auction value
        </Feature>
        <Check />
      </tr>

      <TitleRow>Bosses</TitleRow>

      <tr>
        <td>Boss spawn chances</td>
        <Feature>Regular bosses</Feature>
        <Feature>
          <Strong>Premium</Strong> bosses
        </Feature>
      </tr>
      <tr>
        <td>Private hunting groups</td>
        <Check empty />
        <Check />
      </tr>
    </table>
  )
}

export default ComparisonTable
