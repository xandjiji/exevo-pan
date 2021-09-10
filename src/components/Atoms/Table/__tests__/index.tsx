import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import Table from '..'

describe('<Table />', () => {
  test('should render all elements correctly', () => {
    renderWithProviders(
      <Table>
        <div role="none" />
        <Table.Element>
          <Table.Head>
            <Table.Row>
              <Table.HeadColumn>#</Table.HeadColumn>
              <Table.HeadColumn>Nickname</Table.HeadColumn>
            </Table.Row>
          </Table.Head>

          <Table.Body>
            <Table.Row>
              <Table.Column>1</Table.Column>
              <Table.Column>Ksu</Table.Column>
            </Table.Row>
            <Table.Row>
              <Table.Column>2</Table.Column>
              <Table.Column>Nana</Table.Column>
            </Table.Row>
          </Table.Body>
        </Table.Element>
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    const [firstHeadColumn, secondHeadColumn] =
      screen.getAllByRole('columnheader')
    expect(firstHeadColumn).toHaveTextContent('#')
    expect(secondHeadColumn).toHaveTextContent('Nickname')

    expect(screen.getAllByRole('rowgroup')).toHaveLength(2)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3)

    const [, firstTableRow, secondTableRow] = rows
    expect(firstTableRow).toHaveTextContent('1')
    expect(firstTableRow).toHaveTextContent('Ksu')
    expect(secondTableRow).toHaveTextContent('2')
    expect(secondTableRow).toHaveTextContent('Nana')

    expect(screen.getByRole('none')).toBeInTheDocument()
  })

  test('should display card head correctly with/without subtitles', () => {
    const { rerender } = renderWithProviders(
      <Table title="Main title">content</Table>,
    )

    const titleElement = screen.getByRole('heading')
    expect(titleElement).toHaveTextContent('Main title')

    rerender(
      <Table title="Main title" subtitle="subtitle content">
        content
      </Table>,
    )

    expect(titleElement).toHaveTextContent('Main title')
    expect(screen.getByText('subtitle content')).toBeInTheDocument()
  })

  test.todo('caption element should NOT be visible')

  test.todo('head column highlight prop should display asc/desc symbol')
})
