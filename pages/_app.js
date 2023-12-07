import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import Head from 'next/head';
import localFont from 'next/font/local';
import { useEffect, useState } from "react";
import CursorComponent from '@/components/CursorComponent';
import NavComponent from '@/components/NavComponent';
import FooterComponent from '@/components/FooterComponent';
import Settings from '@/components/Settings.js';
import settings from '@/temp/settings.json';
import AOS from "aos";
import "aos/dist/aos.css";

const shipporiMincho = localFont({
  src: [
    {
      path: '../font/ShipporiMincho-OTF-Bold.otf',
      weight: '700'
    }, {
      path: '../font/ShipporiMincho-OTF-ExtraBold.otf',
      weight: '800'
    }, {
      path: '../font/ShipporiMincho-OTF-Medium.otf',
      weight: '500'
    }, {
      path: '../font/ShipporiMincho-OTF-Regular.otf',
      weight: '400'
    }, {
      path: '../font/ShipporiMincho-OTF-SemiBold.otf',
      weight: '600'
    }
  ],
})

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init();
  }, []);

  return (
    <Settings value={settings}>
      <div className={shipporiMincho.className}>
        <Head>
          <link rel="icon" type="image/svg" href="/favicon_package/icon.svg" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
          <link rel="manifest" href="/favicon_package/site.webmanifest" />
          <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="apple-mobile-web-app-title" content="Origin 起源劇團" />
          <meta name="application-name" content="Origin 起源劇團" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/favicon_package/mstile-144x144.png" />
          <meta name="theme-color" content="#000000" />
          <link rel="icon" type="image/png" sizes="36x36" href="/favicon_package/android-chrome-36x36.png" />
          <link rel="icon" type="image/png" sizes="48x48" href="/favicon_package/android-chrome-48x48.png" />
          <link rel="icon" type="image/png" sizes="72x72" href="/favicon_package/android-chrome-72x72.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon_package/android-chrome-96x96.png" />
          <link rel="icon" type="image/png" sizes="144x144" href="/favicon_package/android-chrome-144x144.png" />
          <link rel="icon" type="image/png" sizes="192x192" href="/favicon_package/android-chrome-192x192.png" />
          <link rel="icon" type="image/png" sizes="256x256" href="/favicon_package/android-chrome-256x256.png" />
          <link rel="icon" type="image/png" sizes="384x384" href="/favicon_package/android-chrome-384x384.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/favicon_package/android-chrome-512x512.png" />
        </Head>
        <CursorComponent></CursorComponent>
        <NavComponent></NavComponent>
        <Component {...pageProps}></Component>
        <FooterComponent></FooterComponent>
      </div>
    </Settings>
  )
}