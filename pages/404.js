import NFComponent from '../components/NFComponent.js';

import Head from 'next/head';

export default function NotFound() {
  return (
    <main>
      <Head>
        {/* HTML Meta Tags  */}
        <title>404 - Origin | 起源劇團</title>
        <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
        <meta name='description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://origin-performing-art.web.app/" />
        <meta property="og:type" content="website" /> {/* article */}
        <meta property='og:title' content='404 - Origin | 起源劇團' />
        <meta property='og:description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />
        <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
        {/*
                    檔案大小：< 8MB
                    檔案尺寸：建議尺寸 1200x630
                    對於圖片的內容 FB 有提供 圖像文字檢查工具 的網站，協助檢測。
                    網址的 url 一定要使用絕對路徑
                */}

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
        <meta property="twitter:domain" content="origin-performing-art.web.app" />
        <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
        <meta name="twitter:title" content="404 - Origin | 起源劇團" />
        <meta name="twitter:description" content="Origin是一個火舞表演團體,主要表演地區為東台灣" />
        <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
      </Head>
      <NFComponent></NFComponent>
    </main>
  )
}