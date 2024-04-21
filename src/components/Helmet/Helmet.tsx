import { Helmet } from 'react-helmet-async';

export const HelmetAsync = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content="web admin battech" />
      <meta name="keywords" content="Admin" />
      <meta name="author" content="by me" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  )
}
