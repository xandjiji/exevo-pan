import { getNodeText } from '..'

const textContent = 'this is a text content'

const cases: React.ReactNode[] = [
  <div>this is a text content</div>,
  <>this is a text content</>,
  'this is a text content',
  <div>
    this is a text <span>content</span>
  </div>,
]

describe('getNodeText()', () => {
  test('should return the correct node text content', () => {
    cases.forEach((element) => {
      expect(getNodeText(element)).toEqual(textContent)
    })

    expect(getNodeText(1)).toEqual('1')
    expect(getNodeText(undefined)).toEqual('')
    expect(getNodeText({})).toEqual('')
  })
})
