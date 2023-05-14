import { Html, Main, NextScript, Head } from 'next/document'
import React from 'react'

export const _document = () => {
  return (
    <Html lang='ru'>
      <Head>
        <link rel='icon' href='/favicon.png' sizes='any' />
        <script defer src="https://yookassa.ru/checkout-widget/v1/checkout-widget.js"></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {process.env.NODE_ENV !== 'development' && <script dangerouslySetInnerHTML={{__html:
          `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
             m[i].l=1*new Date();
             for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
             k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
             (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
          
             ym(93569931, "init", {
                  clickmap:true,
                  trackLinks:true,
                  accurateTrackBounce:true
             });`
        }}
        />}
      </body>
    </Html>
  )
}

export default _document