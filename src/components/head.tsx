import Head from "next/head"

interface CustomHeadProps {
  title?: string
  description?: string
}

export default function CustomHead({
  title = "Facturación Autónomos",
  description = "WebApp moderna para la gestión de facturación de autónomos",
}: CustomHeadProps) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="/styles/global.css" />
    </Head>
  )
}
