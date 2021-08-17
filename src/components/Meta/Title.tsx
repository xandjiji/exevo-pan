const Title = ({ content = 'Exevo Pan' }: MetaTagProps): JSX.Element => (
  <>
    <title>{content}</title>
    <meta name="title" content={content} />
    <meta property="og:site_name" content={content} />
    <meta property="og:title" content={content} />
    <meta property="twitter:title" content={content} />
  </>
)

export default Title
