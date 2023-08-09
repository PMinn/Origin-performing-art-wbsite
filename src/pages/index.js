import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '../styles/index.module.css';
import fontsStyles from '../styles/fonts.module.css';

import { fetchImage } from '../../firebaseConfig.js';

// import HomeSplideComponent from '../components/HomeSplideComponent';

export default function Index() {
  const { data: performanceProject1, error: performanceProject1Error } = useSWR('index/p2/1.jpg', fetchImage);
  const { data: performanceProject2, error: performanceProject2Error } = useSWR('index/p2/2.jpg', fetchImage);
  const { data: LogoAnimation, error: LogoAnimationError } = useSWR('index/p3/LogoAnimation.webm', fetchImage);
  const { data: moreSectionEvent, error: moreSectionEventError } = useSWR('index/p4/p1.jpg', fetchImage);
  const { data: moreSectionBlog, error: moreSectionBlogError } = useSWR('index/p4/p2.jpg', fetchImage);
  return (
    <main>
      <Head></Head>
      <div>
        {/* <HomeSplideComponent></HomeSplideComponent> */}
        <section className={fontsStyles.ZH + ' ' + styles['cover']}>

        </section>
        <section className={fontsStyles.ZH + ' ' + styles['performance-project']}>
          <div className={styles.container + ' container'}>
            <div className="split">
              <h2 className={styles['content-title']}>演出項目</h2>
            </div>
            <div className={styles.imgs}>
              <div className={styles.img}>
                {performanceProject1 ?
                  <img src={performanceProject1} alt="" />
                  :
                  <></>
                }
                <div className="split">
                  <div>街頭表演</div>
                </div>
              </div>
              <div className={styles.img}>
                {performanceProject2 ?
                  <img src={performanceProject2} alt="" />
                  :
                  <></>
                }
                <div className="split">
                  <div>商業演出</div>
                </div>
              </div>
            </div>
            <Link href="/contact" className={styles.anchor + " pointer"}>聯絡我們</Link>
          </div>
        </section>
        <section className={fontsStyles.ZH + ' ' + styles['about-section']}>
          <div className={styles.container + ' container'}>
            {
              LogoAnimation ?
                <video className={styles["logo-video"]} src={LogoAnimation} autoPlay loop muted playsInline></video>
                :
                <></>
            }
            <div>
              <div className="split">
                <h2 className={styles["content-title"]}>跟著<span className={fontsStyles.ENG}>Origin</span>一起遇火重生</h2>
              </div>
              <p>你們是否會常常問自己一個問題，我當初做這件事是開心的嗎？</p>
              <p>最初，也許每一個人心中都是帶著熱情去嘗試新事物，但是隨著時間的流逝，加上高強度壓力的環境壓迫，熱情經常會消逝。跟著<span className={fontsStyles.ENG}>Origin</span>一起遇火重生，燃起你心中深埋的熱情！
              </p>
              <Link href="/about" className={styles.anchor + " pointer"}>關於我們</Link>
            </div>
          </div>
        </section>
        <section className={styles['more-section']}>
          <div className={styles.container + ' container'}>
            <h2 className={styles['content-title']}>更多</h2>
            <Link href="/event" className={styles.anchor + " li pointer"} >
              <div className={fontsStyles.ZH} >
                活動行程
              </div>
              {
                moreSectionEvent ?
                  <img src={moreSectionEvent} alt="" />
                  :
                  <></>
              }
            </Link>
            <Link href="/blog" className={styles.anchor + " li pointer"} >
              <div className={fontsStyles.ZH}>
                BLOG
              </div>
              {
                moreSectionBlog ?
                  <img src={moreSectionBlog} alt="" />
                  :
                  <></>
              }
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}