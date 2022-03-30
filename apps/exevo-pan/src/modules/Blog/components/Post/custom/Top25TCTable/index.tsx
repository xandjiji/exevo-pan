import { formatNumberWithCommas } from 'utils'
import Table from '../../Style/Table'
import ranking from './ranking.json'

/* @ ToDo: i18n */

const Top25TCTable = (): JSX.Element => {
  console.log('ranking')

  return (
    <Table>
      <thead>
        <tr>
          <th>Character</th>
          <th>Invested</th>
        </tr>
      </thead>

      <tbody>
        {ranking.map(({ invested, auction }) => (
          <tr>
            <td>
              {auction.nickname} - Level {auction.level}
            </td>
            <td>{formatNumberWithCommas(invested)} TC</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default Top25TCTable
