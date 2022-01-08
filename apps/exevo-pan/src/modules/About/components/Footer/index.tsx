import { useTranslations } from 'contexts/useTranslation'
import { links } from 'Constants'
import * as S from './styles'

const Footer = (): JSX.Element => {
  const {
    translations: { about },
  } = useTranslations()

  return (
    <S.Wrapper>
      <S.Title>
        <S.UnlicenseIcon aria-label="Unlicensed" />
        {new Date().getFullYear()} {about.FooterTitle}
        <a
          href={links.GITHUB_PROFILE}
          target="_blank"
          rel="noopener noreferrer author external"
          style={{ marginLeft: 3 }}
        >
          xandjiji
        </a>
        .
      </S.Title>
      <S.UnlicenseParagraph>
        This is free and unencumbered software released into the public domain.
      </S.UnlicenseParagraph>
      <S.UnlicenseParagraph>
        Anyone is free to copy, modify, publish, use, compile, sell, or
        distribute this software, either in source code form or as a compiled
        binary, for any purpose, commercial or non-commercial, and by any means.
      </S.UnlicenseParagraph>
      <S.UnlicenseParagraph>
        THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY
        KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
        DEALINGS IN THE SOFTWARE.
      </S.UnlicenseParagraph>
      <S.UnlicenseParagraph>
        For more information, please refer to{' '}
        <a href={links.UNLICENSE} target="_blank" rel="noopener noreferrer">
          The Unlicense
        </a>
        .
      </S.UnlicenseParagraph>
    </S.Wrapper>
  )
}

export default Footer
