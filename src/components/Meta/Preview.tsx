const Preview = ({
  content = '/preview.png',
}: Partial<MetaTagProps>): JSX.Element => (
  <>
    <meta property="og:image" content={content} />
    <meta property="twitter:image" content={content} />
    <meta property="twitter:card" content="summary_large_image" />
  </>
)

export default Preview
