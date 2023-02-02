import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import {
  CurrentSectionProvider,
  useCurrentSection,
} from '../../../../contexts/useCurrentSection'
import { Section } from '../../../../contexts/useCurrentSection/types'
import Pillar from '..'

const sections: Section[] = [
  { title: 'First', offset: 100, status: false },
  { title: 'Second', offset: 200, status: false },
  { title: 'Third', offset: 300, status: false },
]

const titles = sections.map(({ title }) => title)

const TestComponent = ({ section }: { section: Section }) => {
  const { setSectionStatus } = useCurrentSection()

  return (
    <>
      <Pillar titles={titles} />
      <button type="button" onClick={() => setSectionStatus(section)}>
        set
      </button>
    </>
  )
}

describe('<Pillar />', () => {
  test('if no titles available, it should render nothing', () => {
    const { container } = renderWithProviders(<Pillar titles={[]} />, {
      wrapper: CurrentSectionProvider as React.ComponentType,
    })

    expect(container.childElementCount).toEqual(1)
  })

  test('should render every title correctly', () => {
    renderWithProviders(<TestComponent section={{} as Section} />, {
      wrapper: CurrentSectionProvider as React.ComponentType,
    })

    titles.forEach((title) => {
      expect(screen.getByRole('link', { name: title })).toBeInTheDocument()
    })
  })

  test('should highlight the highest visible section', () => {
    const [first, second, third] = sections

    const { rerender } = renderWithProviders(
      <TestComponent section={{ ...third, status: true }} />,
      {
        wrapper: CurrentSectionProvider as React.ComponentType,
      },
    )
    const setter = screen.getByRole('button')

    const [firstElement, secondElement, thirdElement] =
      screen.getAllByRole('listitem')

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...second, status: true }} />)
    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...second, status: false }} />)
    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...second, status: true }} />)
    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...first, status: true }} />)
    userEvent.click(setter)

    expect(firstElement).toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')
  })

  test('if no visible section available, preserver the last highlighted section', () => {
    const [first, second, third] = sections

    const { rerender } = renderWithProviders(
      <TestComponent section={{ ...second, status: true }} />,
      {
        wrapper: CurrentSectionProvider as React.ComponentType,
      },
    )
    const setter = screen.getByRole('button')

    const [firstElement, secondElement, thirdElement] =
      screen.getAllByRole('listitem')

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...second, status: false }} />)
    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).toHaveAttribute('aria-current', 'step')
    expect(thirdElement).not.toHaveAttribute('aria-current', 'step')

    rerender(<TestComponent section={{ ...third, status: true }} />)
    userEvent.click(setter)

    expect(firstElement).not.toHaveAttribute('aria-current', 'step')
    expect(secondElement).not.toHaveAttribute('aria-current', 'step')
    expect(thirdElement).toHaveAttribute('aria-current', 'step')
  })
})
