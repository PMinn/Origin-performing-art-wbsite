import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '@/styles/index.module.css';
import btnStyles from '@/styles/btn.module.css';

import { fetchImage, fetchDatabase, fetchStorageMutipleByPaths } from '@/firebase.js';
import Layout from '@/components/Layout';

async function fetchHomeSplideImage() {
  const urls = await fetchDatabase('/homeSplide');
  const images = await fetchStorageMutipleByPaths(urls);
  return images;
}

export default function Index({ title, description, data }) {
  const { data: homeSplide, error: homeSplideError } = useSWR('/fetchHomeSplideImage', () => fetchHomeSplideImage(data.homeSplide));
  const { data: performanceProject1, error: performanceProject1Error } = useSWR('index/p2/1.jpg', fetchImage);
  const { data: performanceProject2, error: performanceProject2Error } = useSWR('index/p2/2.jpg', fetchImage);
  const { data: LogoAnimation, error: LogoAnimationError } = useSWR('index/p3/LogoAnimation.webm', fetchImage);
  const { data: moreSectionEvent, error: moreSectionEventError } = useSWR('index/p4/p1.jpg', fetchImage);
  const { data: moreSectionBlog, error: moreSectionBlogError } = useSWR('index/p4/p2.jpg', fetchImage);

  return (
    <Layout>
      <Head>
        {/* HTML Meta Tags  */}
        <title>{title}</title>
        <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
        <meta name='description' content={description} />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://origin-performing-art.web.app/" />
        <meta property="og:type" content="website" /> {/* article */}
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
        <meta property="twitter:domain" content="origin-performing-art.web.app" />
        <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
      </Head>
      <div>
        <section className={styles['cover']}>
          <h2>起源劇團</h2>
          {
            homeSplide ?
              (
                <>
                  <div className={styles.round} style={{ '--during': 10 * homeSplide.length + 's' }}>
                    {
                      homeSplide.map((url, index) => {
                        return (<img src={url} key={'cover_1_' + index} />)
                      })
                    }
                  </div>
                  <div className={styles.round} style={{ '--during': 10 * homeSplide.length + 's' }}>
                    {
                      homeSplide.map((url, index) => {
                        return (<img src={url} key={'cover_2_' + index} />)
                      })
                    }
                  </div>
                </>
              )
              :
              <></>
          }
          <h2>Origin</h2>
        </section>
        <section className={styles.intro}>
          <div className={styles.container + ' container'}>
            <p data-aos="fade-up" data-aos-duration="1000">
              我們因著火舞而相遇<br />
              有了共同努力的目標<br />
              我們想將對表演的酷愛與熱忱<br />
              與其令人無法抵擋的歡樂帶上街頭<br />
              在觀眾的心中留下一抹深刻的記憶
            </p>
          </div>
        </section>
        <section className={styles['performance-project']}>
          <div className={styles.container + ' container'}>
            <h2 className={styles['content-title']} data-aos="fade-up" data-aos-duration="1000">演出項目</h2>
            <div className={styles.imgs}>
              <div className={styles.img}>
                {
                  performanceProject1 ?
                    <img src={performanceProject1} alt="街頭表演" />
                    :
                    <></>
                }
                <div data-aos="fade-up" data-aos-duration="1000">街頭表演</div>
              </div>
              <div className={styles.img}>
                {
                  performanceProject2 ?
                    <img src={performanceProject2} alt="商業演出" />
                    :
                    <></>
                }
                <div data-aos="fade-up" data-aos-duration="1000">商業演出</div>
              </div>
            </div>
            <div className='w-100 d-flex justify-content-center'>
              <Link href="/contact" className={btnStyles.btn + " pointer"}>聯絡我們</Link>
            </div>
          </div>
        </section>
        <section className={styles['about-section']}>
          <div className={styles.container + ' container'}>
            {
              LogoAnimation ?
                <video className={styles["logo-video"]} src={LogoAnimation} autoPlay loop muted playsInline></video>
                :
                <></>
            }
            <div data-aos="fade-up" data-aos-duration="1000">
              <div>
                <h2 className={styles["content-title"]}>跟著Origin一起遇火重生</h2>
              </div>
              <p>你們是否會常常問自己一個問題，我當初做這件事是開心的嗎？</p>
              <p>最初，也許每一個人心中都是帶著熱情去嘗試新事物，但是隨著時間的流逝，加上高強度壓力的環境壓迫，熱情經常會消逝。跟著Origin一起遇火重生，燃起你心中深埋的熱情！
              </p>
              <div className='w-100 d-flex justify-content-center'>
                <Link href="/about" className={btnStyles.btn + " pointer"}>關於我們</Link>
              </div>
            </div>
          </div>
        </section>
        <section className={styles['more-section']}>
          <div className={styles.container + ' container'}>
            <h2 className={styles['content-title']}>更多</h2>
            <Link href="/event/list/1" className={styles.anchor + " li pointer"} data-aos="fade-right" data-aos-duration="1000">
              <div>
                活動行程
              </div>
              {
                moreSectionEvent ?
                  <img src={moreSectionEvent} alt="" />
                  :
                  <></>
              }
            </Link>
            <Link href="/blog/list/1" className={styles.anchor + " li pointer"} data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
              <div>
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
    </Layout>
  )
}

export async function getStaticProps() {
  const urls = await fetchDatabase('/homeSplide');
  return {
    props: {
      title: 'Origin 起源劇團',
      description: '我們因著火舞而相遇，有了共同努力的目標，我們想將對表演的酷愛與熱忱，與其令人無法抵擋的歡樂帶上街頭，在觀眾的心中留下一抹深刻的記憶。演出項目：街頭表演、商業演出。',
      data: {
        homeSplide: urls
      }
    }
  }
}