/* eslint-disable jsx-a11y/control-has-associated-label */
import clsx from 'clsx'
import { FilledCheckIcon } from 'assets/svgs'

const TitleRow = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <tr>
    <td
      className={clsx(
        className,
        'text-primaryHighlight py-4 text-2xl font-bold',
      )}
      {...props}
    />
  </tr>
)

const Feature = ({ className, ...props }: React.ComponentProps<'td'>) => (
  <td className={clsx(className, 'font-light')} {...props} />
)

const Check = ({ empty = false }) => (
  <td>
    {!empty && <FilledCheckIcon className="fill-greenHighlight align-middle" />}
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
        <Feature>Regular filters</Feature>
        <Check />
        <Check />
      </tr>
      <tr>
        <Feature>
          <Strong>Premium</Strong> filters
        </Feature>
        <Check empty />
        <Check />
      </tr>

      <TitleRow>Bosses</TitleRow>

      <tr>
        <Feature>Spawn chances for regular bosses</Feature>
        <Check />
        <Check />
      </tr>
      <tr>
        <Feature>
          Spawn chances for <Strong>premium</Strong> bosses
        </Feature>
        <Check empty />
        <Check />
      </tr>
    </table>
  )
}

export default ComparisonTable
