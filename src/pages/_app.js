import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Head from 'next/head';
import localFont from 'next/font/local';
import { useEffect, useState } from "react";
import CursorComponent from '../components/CursorComponent';
import NavComponent from '../components/NavComponent';
import FooterComponent from '../components/FooterComponent';

import AOS from "aos";
import "aos/dist/aos.css";

const shipporiMincho = localFont({
  src: [
    {
      path: '../../font/ShipporiMincho-OTF-Bold.otf',
      weight: '700'
    }, {
      path: '../../font/ShipporiMincho-OTF-ExtraBold.otf',
      weight: '800'
    }, {
      path: '../../font/ShipporiMincho-OTF-Medium.otf',
      weight: '500'
    }, {
      path: '../../font/ShipporiMincho-OTF-Regular.otf',
      weight: '400'
    }, {
      path: '../../font/ShipporiMincho-OTF-SemiBold.otf',
      weight: '600'
    }
  ],
})

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init();
  }, []);

  return (
    <div className={shipporiMincho.className}>
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
        <link rel="manifest" href="/favicon_package/site.webmanifest" />
        <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg" color="#eb5604" />
        <meta name="apple-mobile-web-app-title" content="Origin" />
        <meta name="application-name" content="Origin" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <CursorComponent></CursorComponent>
      <NavComponent></NavComponent>
      <Component {...pageProps}></Component>
      <FooterComponent></FooterComponent>
    </div>
  )
}