import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '../../../styles/blog.module.css';
import fontsStyles from '../../../styles/fonts.module.css';

import NFComponent from '../../../components/NFComponent.js';

import { fetchBlog } from '../../../../firebaseConfig.js';

export default function Blog() {
    const router = useRouter();
    var { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/blog', id: router.query.id }, fetchBlog);

    useEffect(() => {
        const main_img = document.querySelector('.main-img img');
        function scrollChangeImageSizeAnimation() {
            var imgHight = window.innerHeight * 0.4;
            var scrollHeight = window.scrollY;
            var scrollRate = scrollHeight / imgHight;
            main_img.style.transform = `scale(${1 + scrollRate})`;
        }
        document.removeEventListener('scroll', scrollChangeImageSizeAnimation);
        document.addEventListener('scroll', scrollChangeImageSizeAnimation);
    }, []);

    return (
        <main className={styles.outer}>
            <Head>
                {
                    !isLoading ?
                        (
                            !error ?
                                (
                                    data.code == 200 ?
                                        <title>{data.title + ' - blog - Origin | 起源劇團'}</title>
                                        : (
                                            data.code == 404 ?
                                                <></>
                                                :
                                                <title>blog - Origin | 起源劇團</title>
                                        )
                                ) :
                                <title>blog - Origin | 起源劇團</title>
                        ) :
                        <title>blog - Origin | 起源劇團</title>
                }
            </Head>
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
                                                    <h6 className={styles['blog-date'] + ' ' + fontsStyles.ENG}>{`${data.date.toDate().getFullYear()} / ${data.date.toDate().getMonth() + 1} / ${data.date.toDate().getDate()}`}</h6>
                                                    <h1 className={styles['blog-title'] + ' ' + fontsStyles.ZH}>{data.title}</h1>
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