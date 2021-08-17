const Description = ({ content }: MetaTagProps): JSX.Element => (
  <>
    <meta name="description" content={content} />
    <meta property="twitter:description" content={content} />
    <meta property="og:description" content={content} />
    <meta property="og:type" content="website" />
  </>
)

export default Description
