import Link from 'next/link';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '../styles/about.module.css';

import { fetchDatabase, fetchStorageMutipleByPaths } from '@/firebase.js';
import Layout from '@/components/Layout';

export default function About({ title, description, data }) {
  const { data: images } = useSWR({ url: '/storage', path: 'members' }, async () => await fetchStorageMutipleByPaths(data.members.map(member => member.image)));

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
      <div className={styles.container + ' container'}>
        <h2 className={styles.title}>成員</h2>
        <div className='row'>
          {
            images ?
              data.members.map((member, index) => (
                <div className={'col-6 col-md-4 py-5 px-md-4 px-2 ' + styles['member-card']} data-aos="fade-up" data-aos-duration="1000" key={'member_card_' + index}>
                  <div className={styles['outer-img']}>
                    <img src={images[index]} />
                  </div>
                  <div>
                    <h3 className='mt-4'>{member.name}</h3>
                    {
                      member.instagram ?
                        <Link className={styles['media-link'] + " anchor pointer"} href={'https://instagram.com/' + member.instagram}>
                          <img src="/media/instagram.svg" />Instagram
                        </Link>
                        :
                        <></>
                    }
                    <div>{member.intro}</div>
                  </div>
                </div>
              ))
              :
              <></>
          }
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const members = await fetchDatabase('/members');
  return {
    props: {
      title: '關於我們 | Origin 起源劇團',
      description: '關於我們，成員。',
      data: {
        members
      }
    }
  }
}