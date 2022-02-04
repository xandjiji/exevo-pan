import { screen } from '@testing-library/react'
import { renderWithProviders } from 'utils/test'
import { blogTags } from 'Constants'
import { common } from 'locales'
import Tag from '..'

const { BlogTags: localeTags } = common.en

describe('<Tag />', () => {
  test.each(blogTags.all)(
    'should render correctly using a TagId',
    (blogTag) => {
      renderWithProviders(<Tag tagId={blogTag.id} />)

      expect(
        screen.getByText(localeTags[blogTag.id as keyof typeof localeTags]),
      ).toBeInTheDocument()
    },
  )

  test('should render correctly being a CustomTag', () => {
    const content = 'Custom tag'
    renderWithProviders(<Tag tagColor={10}>{content}</Tag>)

    expect(screen.getByText(content)).toBeInTheDocument()
  })

  test('as a Switch, it should work correctly', () => {
    const content = 'Custom tag'
    const { rerender } = renderWithProviders(
      <Tag tagColor={10} clickable>
        {content}
      </Tag>,
    )

    const tagElement = screen.getByRole('switch', { name: content })

    expect(tagElement).not.toBeChecked()

    rerender(
      <Tag tagColor={10} clickable active>
        {content}
      </Tag>,
    )

    expect(tagElement).toBeChecked()
  })
})
