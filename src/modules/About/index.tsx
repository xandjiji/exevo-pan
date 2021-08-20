import * as S from './styles'

const About = (): JSX.Element => {
  console.log(9)
  return (
    <S.Wrapper>
      <S.Column>
        <S.H1>About us</S.H1>
        <S.Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nec
          porttitor ipsum. Curabitur id tempor libero, vel luctus quam.
          Pellentesque vulputate iaculis justo in lobortis. Integer ultrices
          justo vel interdum tristique. In facilisis pulvinar vulputate. Nullam
          tristique lorem quis ex efficitur, ut aliquet risus rhoncus.
        </S.Paragraph>
        <S.Paragraph>
          Donec eget ultrices leo. Curabitur non tincidunt purus. Sed ornare
          turpis sed elit vehicula, et dapibus tortor eleifend. Vivamus dictum
          sem eu tellus tincidunt, non euismod ligula pulvinar. Duis at posuere
          quam. Etiam tincidunt et nisi non commodo. Vestibulum vitae tortor
          nibh. Sed tristique, nisi nec tincidunt euismod, arcu lorem commodo
          eros, et rutrum turpis justo id eros.
        </S.Paragraph>
      </S.Column>
      <S.Column>
        <S.H2>Contact information</S.H2>

        <S.Ul>
          <S.Li>
            <S.MailIcon />
            <S.Link
              href="mailto:xandjiji@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              xandjiji@gmail.com
            </S.Link>
          </S.Li>
          <S.Li>
            <S.GithubIcon />
            <S.Link
              href="https://github.com/xandjiji"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://github.com/xandjiji
            </S.Link>
          </S.Li>
          <S.Li>
            <S.LinkedinIcon />
            <S.Link
              href="https://www.linkedin.com/in/xandjiji"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.linkedin.com/in/xandjiji
            </S.Link>
          </S.Li>
        </S.Ul>
      </S.Column>
    </S.Wrapper>
  )
}

export default About
