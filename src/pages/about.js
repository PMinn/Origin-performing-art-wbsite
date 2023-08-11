import Link from 'next/link';
import Head from 'next/head';
// import useSWR from 'swr';
import { useEffect } from 'react';

import styles from '../styles/about.module.css';
// import fontsStyles from '../styles/fonts.module.css';

// import { fetchImage } from '../../firebaseConfig.js';

// import HomeSplideComponent from '../components/HomeSplideComponent';

export default function About() {
  const members = [{
    name: '德龍',
    image: 'https://d1fdloi71mui9q.cloudfront.net/5XSAbmsQuyvP5OSgCM2P_2242C6D7-B5A4-41E0-B8CD-0A70440C281D.jpeg',
    instagram: 'derlongchen_performing_tw',
    intro: ''
  }, {
    name: '馬德',
    image: 'https://d1fdloi71mui9q.cloudfront.net/T8Pe1fdzRT6YC0cTHhDE_2CA641F7-AC7E-44A7-B4F2-B97FF4C34CAD.jpeg',
    instagram: 'de_lun_ma',
    intro: ''
  }, {
    name: '峻溢',
    image: 'https://d1fdloi71mui9q.cloudfront.net/ikLP18TuRm6tWLExAuei_726B86D8-8454-4273-8647-0010021F3316.png',
    instagram: 'greenfire_nv07',
    intro: ''
  }, {
    name: '海默',
    image: 'https://d1fdloi71mui9q.cloudfront.net/kHVdJhvSIOyqlhGQfWVm_A5F85CF1-9E71-4CB0-958E-A0120C0BA4A2.png',
    instagram: 'roam_in_the_fire',
    intro: ''
  }, {
    name: '盜月',
    image: 'https://d1fdloi71mui9q.cloudfront.net/7ruZnfhtQWdrZpq33E0I_1721476E-4351-495F-BBE4-B94E30A4C9D2.png',
    instagram: 'pilfermoon',
    intro: ''
  }, {
    name: '江鳥',
    image: 'https://d1fdloi71mui9q.cloudfront.net/oFDDDQ9T8WEVEzSfPX9e_D4717E12-5F69-4FF7-8574-FCFAD27ECB7A.jpeg',
    instagram: 'yu_hong_fire',
    intro: ''
  }];

  useEffect(() => {
    const imgs = document.querySelectorAll('.outer-img>img');
    function onscroll() {
      imgs.forEach(img => {
        var rect = img.getBoundingClientRect();
        var center = 1 - ((rect.top + rect.height / 2 + document.documentElement.clientHeight / 2) / document.documentElement.clientHeight);
        var move = document.documentElement.clientWidth * 0.86 * 0.2 / 2 * - center;
        img.style.transform = `translateY(${move}px)`;
      })
    }
    document.removeEventListener('scroll', onscroll);
    document.addEventListener('scroll', onscroll);
  }, []);

  return (
    <main>
      <Head>
        {/* HTML Meta Tags  */}
        <title>關於我們 - Origin | 起源劇團</title>
        <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
        <meta name='description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://origin-performing-art.web.app/" />
        <meta property="og:type" content="website" /> {/* article */}
        <meta property='og:title' content='關於我們 - Origin | 起源劇團' />
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
        <meta name="twitter:title" content="關於我們 - Origin | 起源劇團" />
        <meta name="twitter:description" content="Origin是一個火舞表演團體,主要表演地區為東台灣" />
        <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
      </Head>
      <div className={styles.panel}>
        <h2 className={styles.title}>成員</h2>
        <div className={styles.content}>
          {
            members.map((member, index) => (
              <div className={styles['member-card']} key={'member_card_' + index}>
                <div className={styles['outer-img'] + ' outer-img'}>
                  <img src={member.image} />
                  <h3>{member.name}</h3>
                </div>
                <div>
                  <Link className={"anchor pointer"} href={'https://instagram.com/' + member.instagram}>
                    <img src="/media/instagram.svg" />Instagram
                  </Link>
                  <div>{member.intro}</div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}