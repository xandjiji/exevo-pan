import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from 'utils/test'
import { AccountIcon, AddPostIcon, CheckIcon } from 'assets/svgs'
import Menu from '..'
import { MenuProps } from '../types'

const onSelectMock = jest.fn()

const props: MenuProps = {
  children: <button type="button" aria-label="toggle" />,
  items: [
    {
      icon: CheckIcon,
      label: 'Accept',
      onSelect: onSelectMock,
    },
    {
      label: 'Find similar',
      onSelect: onSelectMock,
    },
    {
      icon: AccountIcon,
      label: 'Account',
      onSelect: onSelectMock,
    },
    {
      icon: AddPostIcon,
      label: 'Add',
      disabled: true,
      onSelect: onSelectMock,
    },
    {
      label: 'Close',
      onSelect: onSelectMock,
    },
    {
      label: <div>Element</div>,
      'aria-label': 'element',
      onSelect: onSelectMock,
    },
  ],
}

describe('<Menu />', () => {
  const setup = () => {
    const toggleElement = screen.getByRole('button', { name: 'toggle' })

    const assertOpen = (isOpen = true) => {
      if (isOpen) {
        expect(screen.getByRole('menu')).toBeInTheDocument()
      } else {
        expect(screen.queryByRole('menu')).not.toBeInTheDocument()
      }
    }

    let callCount = 0
    const assertOnSelectCall = (wasCalled = true) => {
      if (wasCalled) {
        callCount += 1
      }

      expect(onSelectMock).toHaveBeenCalledTimes(callCount)
    }

    return {
      toggleElement,
      assertOpen,
      getItems: () => {
        const [a, b, c, disabled, e, element] = screen.getAllByRole('menuitem')
        return { a, b, c, disabled, e, element }
      },
      assertHighlighted: (element?: HTMLElement) => {
        const menuElement = screen.getByRole('menu')
        if (element) {
          expect(menuElement).toHaveAttribute(
            'aria-activedescendant',
            element.id,
          )
        } else {
          expect(menuElement).not.toHaveAttribute('aria-activedescendant')
        }
      },
      assertOnSelectCall,
    }
  }

  beforeEach(() => {
    onSelectMock.mockClear()
  })

  test('should have a title element', () => {
    renderWithProviders(
      <Menu {...props} titleElement={<h1>title element</h1>} />,
    )

    userEvent.click(setup().toggleElement)
    expect(screen.getByText('title element')).toBeInTheDocument()
  })

  describe('should be controlled correctly with', () => {
    test('mouse', () => {
      renderWithProviders(
        <>
          <Menu {...props} titleElement={<h1>title element</h1>} />
          <div role="button">outside</div>
        </>,
      )

      const {
        toggleElement,
        assertOpen,
        getItems,
        assertOnSelectCall,
        assertHighlighted,
      } = setup()

      assertOpen(false)
      userEvent.click(toggleElement)
      assertOpen()
      userEvent.click(screen.getByRole('button', { name: 'outside' }))
      assertOpen(false)
      userEvent.click(toggleElement)
      assertOpen()

      userEvent.click(getItems().a)
      assertOpen(false)
      assertOnSelectCall()

      userEvent.click(toggleElement)
      assertHighlighted()
      userEvent.click(getItems().element)
      assertOpen(false)
      assertOnSelectCall()

      userEvent.click(toggleElement)
      userEvent.click(getItems().disabled)
      assertOpen()
      assertOnSelectCall(false)
      assertHighlighted()

      userEvent.hover(getItems().b)
      assertHighlighted(getItems().b)

      userEvent.hover(getItems().disabled)
      assertHighlighted(getItems().b)
    })

    test.todo('keyboard')
  })

  test.todo('typing should highlight items by text')

  test.todo('a11y')
})
