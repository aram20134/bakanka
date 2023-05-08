import { Html, Main, NextScript, Head } from 'next/document'
import React from 'react'

export const _document = () => {
  return (
    <Html lang='ru'>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default _document