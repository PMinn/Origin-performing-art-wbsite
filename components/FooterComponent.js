import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/FooterComponent.module.css';
// import fontsStyles from '../styles/fonts.module.css';
import useSWR from 'swr';

import { fetchDatabase } from '@/firebase.js';


export default function FooterComponent() {
    const { data, error, isLoading, isValidating, mutate } = useSWR({ url: '/db', path: 'settings/' }, async ({ path }) => await fetchDatabase(path));

    return (
        <footer className={styles.footer}>
            <div className={styles["footer-inner"] + " container"}>
                <div className={styles.hr + " row"}>
                    <div className={styles["footer-inner-left"] + " col-8"}>
                        <div className={styles.hr + ' ' + styles["footer-block-logo"]}>
                            <img className={styles["footer-logo"]} src="/media/Logo.png" alt="" />
                            <a className={styles.anchor + ' ' + styles.name}>Origin 起源劇團</a>
                        </div>
                        <div className={styles["footer-block-media"]} >
                            <Link href={'https://www.facebook.com/' + data?.facebook} className={styles.anchor + ' pointer'} target="_blank">
                                <img src="/media/facebook.svg" width="24" height="24" alt="" />
                                {data?.facebook}
                            </Link>
                            <Link href={'https://www.instagram.com/' + data?.instagram} className={styles.anchor + ' pointer'} target="_blank">
                                <img src="/media/instagram.svg" width="24" height="24" alt="" />
                                {data?.instagram}
                            </Link>
                        </div>
                    </div>
                    <div className={styles["footer-inner-right"] + " col-4"}>
                        <div className={styles["footer-block-link"]}>
                            <Link href="/" className={styles.anchor + ' pointer'}>首頁</Link>
                            <Link href="/about" className={styles.anchor + ' pointer'}>關於我們</Link>
                            <Link href="/event" className={styles.anchor + ' pointer'}>活動行程</Link>
                            <Link href="/blog" className={styles.anchor + ' pointer'}>BLOG</Link>
                            <Link href="/contact" className={styles.anchor + ' pointer'}>聯絡我們</Link>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <small className={styles['footer-block-copyright']}>Copyright© 2022 <Link className='pointer' href="https://github.com/PMinn"
                        target="_blank">P'MIN.</Link> All Rights Reserved.</small>
                </div>
            </div>
        </footer>
    )
}