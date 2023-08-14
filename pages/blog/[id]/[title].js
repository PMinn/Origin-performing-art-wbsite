import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '@/styles/post.module.css';

import NFComponent from '@/components/NFComponent.js';
import LoadingComponent from '@/components/LoadingComponent.js';

import { fetchBlog } from '@/firebase.js';

export default function Blog() {
    const router = useRouter();
    const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/blog', id: router.query.id }, fetchBlog);

    return (
        <main>
            <Head>
                <meta name='keywords' content='Origin,起源劇團,火舞,藝術,表演' />
                <meta name='description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />
                <meta property="og:url" content="https://origin-performing-art.web.app/" />
                <meta property="og:type" content="website" /> {/* article */}
                <meta property='og:description' content='Origin是一個火舞表演團體,主要表演地區為東台灣' />
                <meta property="og:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
                <meta name="twitter:card" content="app" /> {/* summary, summary_large_image, app, player */}
                <meta property="twitter:domain" content="origin-performing-art.web.app" />
                <meta property="twitter:url" content="https://origin-performing-art.web.app/" />
                <meta name="twitter:description" content="Origin是一個火舞表演團體,主要表演地區為東台灣" />
                <meta name="twitter:image" content="https://origin-performing-art.web.app/favicon_package/android-chrome-512x512.png" />
                {
                    !isLoading ?
                        (
                            !error ?
                                (
                                    data.code == 200 ?
                                        <title>{data.title + ' - BLOG - Origin | 起源劇團'}</title>
                                        : (
                                            data.code == 404 ?
                                                <></>
                                                :
                                                <title>BLOG - Origin | 起源劇團</title>
                                        )
                                ) :
                                <title>BLOG - Origin | 起源劇團</title>
                        ) :
                        <title>BLOG - Origin | 起源劇團</title>
                }
            </Head>
            <LoadingComponent isLoading={isLoading}></LoadingComponent>
            {
                !isLoading ?
                    (
                        !error ?
                            (
                                data.code == 200 ?
                                    (
                                        <>
                                            <div className={styles.outer}>
                                                <div className={styles.content}>
                                                    <img src={data.image} alt="" />
                                                </div>
                                                <div className={styles.inner + ' container'}>
                                                    <h2>{data.title}</h2>
                                                    <h6 className={styles.date}>{`${data.date.toDate().getFullYear()} / ${data.date.toDate().getMonth() + 1} / ${data.date.toDate().getDate()}`}</h6>
                                                </div>
                                            </div>
                                            <div className={styles.text + ' container'}>{data.html}</div>
                                        </>
                                    ) : (
                                        data.code == 404 ?
                                            (
                                                <NFComponent></NFComponent>
                                            ) : (
                                                <script>alert("error: " + {error})</script>
                                            )
                                    )
                            ) : (
                                <script>alert("error: "+{error})</script>
                            )
                    ) : (
                        <></>
                    )
            }
        </main >
    )
}