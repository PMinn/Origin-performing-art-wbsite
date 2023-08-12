import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '../../../styles/blog.module.css';
// import fontsStyles from '@/styles/fonts.module.css';

import NFComponent from '../../../components/NFComponent.js';
import LoadingComponent from '../../../components/LoadingComponent.js';

import { fetchBlog } from '../../../firebaseConfig.js';

export default function Blog() {
    const router = useRouter();
    var { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/blog', id: router.query.id }, fetchBlog);

    useEffect(() => {
        function scrollChangeImageSizeAnimation() {
            const main_img = document.querySelector('.main-img img');
            if (main_img) {
                var imgHight = window.innerHeight * 0.4;
                var scrollHeight = window.scrollY;
                var scrollRate = scrollHeight / imgHight;
                main_img.style.transform = `scale(${1 + scrollRate})`;
            }
        }
        document.removeEventListener('scroll', scrollChangeImageSizeAnimation);
        document.addEventListener('scroll', scrollChangeImageSizeAnimation);
    }, []);

    return (
        <main className={styles.outer}>
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
                                            <div className={styles.main}>
                                                <div className={styles['main-img'] + ' main-img'}>
                                                    <img src={data.img} alt="" />
                                                </div>
                                                <div className={styles['main-text']}>
                                                    <h6 className={styles['blog-date']}>{`${data.date.toDate().getFullYear()} / ${data.date.toDate().getMonth() + 1} / ${data.date.toDate().getDate()}`}</h6>
                                                    <h1 className={styles['blog-title']}>{data.title}</h1>
                                                    <div className={styles.hr}></div>
                                                </div>
                                            </div>
                                            <div className={styles.content}>{data.html}</div>
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