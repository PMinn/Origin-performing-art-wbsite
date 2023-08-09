import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Head from 'next/head';
// import localFont from 'next/font/local';
import { useEffect, useState } from "react";
import CursorComponent from '../components/CursorComponent';
import NavComponent from '../components/NavComponent';
import FooterComponent from '../components/FooterComponent';


export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div >
      <Head>
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png?v=4.0" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png?v=4.0" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png?v=4.0" />
        <link rel="manifest" href="/favicon_package/site.webmanifest?v=4.0" />
        <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg?v=4.0" color="#ffb11b" />
        <link rel="shortcut icon" href="/favicon_package/favicon.ico?v=4.0" />
        <meta name="apple-mobile-web-app-title" content="每日文大" />
        <meta name="application-name" content="每日文大" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/favicon_package/mstile-144x144.png?v=4.0" />
        <meta name="msapplication-config" content="/favicon_package/browserconfig.xml?v=4.0" />
        <meta name="theme-color" content="#FFB11B" /> */}
      </Head>
      <CursorComponent></CursorComponent>
      <NavComponent></NavComponent>
      <Component {...pageProps} />
      <FooterComponent></FooterComponent>
    </div>
  )
}