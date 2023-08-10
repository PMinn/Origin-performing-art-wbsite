import { useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import styles from '../../../styles/event.module.css';
import fontsStyles from '../../../styles/fonts.module.css';

import NFComponent from '../../../components/NFComponent.js';

import { fetchEvent } from '../../../../firebaseConfig.js';

export default function Event() {
    const router = useRouter();
    var { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/event', id: router.query.id }, fetchEvent);

    useEffect(() => {

    }, []);

    return (
        <main>
            <Head>
                {
                    !isLoading ?
                        (
                            !error ?
                                (
                                    data.code == 200 ?
                                        <title>{data.title + ' - event - Origin | 起源劇團'}</title>
                                        : (
                                            data.code == 404 ?
                                                <></>
                                                :
                                                <title>event - Origin | 起源劇團</title>
                                        )
                                ) :
                                <title>event - Origin | 起源劇團</title>
                        ) :
                        <title>event - Origin | 起源劇團</title>
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
                                                                        <div className={styles.hr} class=""></div>
                                                                        <div className={fontsStyles.ZH}><img src="/media/event/location.svg" alt="location icon" /> {list.location.zh}</div>
                                                                        <span className={fontsStyles.ENG}><img src="/media/event/time.svg" alt="time icon" /> {list.timeString}</span>
                                                                    </div>
                                                                )
                                                            })
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.text + ' ' + fontsStyles.ZH + ' container'}>{data.html}</div>
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