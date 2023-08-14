import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '../../../styles/event.module.css';
// import fontsStyles from '../../../styles/fonts.module.css';

import NFComponent from '../../../components/NFComponent.js';
import LoadingComponent from '../../../components/LoadingComponent.js';

import { fetchEvent } from '../../../firebase.js';

export default function Event() {
    const router = useRouter();
    const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/event', id: router.query.id }, fetchEvent);

    useEffect(() => {

    }, []);

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
                                        <title>{data.title + ' - 活動行程 - Origin | 起源劇團'}</title>
                                        : (
                                            data.code == 404 ?
                                                <></>
                                                :
                                                <title>活動行程 - Origin | 起源劇團</title>
                                        )
                                ) :
                                <title>活動行程 - Origin | 起源劇團</title>
                        ) :
                        <title>活動行程 - Origin | 起源劇團</title>
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
                                                    <div className={styles['event-detail']}>
                                                        {
                                                            data.lists.map((list, index) => {
                                                                return (
                                                                    <div>
                                                                        <div className={styles.hr}></div>
                                                                        <div><img src="/media/event/location.svg" alt="location icon" /> {list.location.zh}</div>
                                                                        <span><img src="/media/event/time.svg" alt="time icon" /> {list.timeString}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
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