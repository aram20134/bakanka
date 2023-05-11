import { Html, Main, NextScript, Head } from 'next/document'
import React from 'react'

export const _document = () => {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='icon' href='/favicon.png' sizes='any' />
        <script src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
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