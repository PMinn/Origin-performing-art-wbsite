import { useState } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import styles from '@/styles/list.module.css';
import btnStyles from '@/styles/btn.module.css';

import { fetchDatabase } from '@/firebase.js';

import ListPageComponent from '@/components/ListPageComponent';
import Layout from '@/components/Layout';

export default function BlogList({ title, description }) {
    const { data: maxSort } = useSWR({ url: '/db', path: 'blogs/maxSort' }, async ({ path }) => await fetchDatabase(path));
    const [isLoading, setIsLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(10);
    const pages = [];
    for (let sort = maxSort + 1; sort > maxSort - pageIndex + 1; sort -= 10) {
        pages.push(<ListPageComponent before={sort} type='blog' key={sort}></ListPageComponent>)
    }
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
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
            </Head>
            <div className={styles.container + ' container'}>
                <h2 className={styles['page-title'] + ' m-5'}>BLOG</h2>
                {pages}
                {
                    pageIndex < maxSort ?
                        <div className='w-100 d-flex justify-content-center'>
                            <div className={btnStyles.btn + ' mt-5 pointer'} onClick={() => setPageIndex(pageIndex + 10)}>More</div>
                        </div>
                        :
                        <></>
                }
            </div>
        </Layout>
    )
}

export function getStaticProps() {
    return {
        props: {
            title: 'BLOG | Origin 起源劇團',
            description: 'BLOG'
        }
    }
}