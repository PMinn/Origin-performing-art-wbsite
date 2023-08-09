import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/FooterComponent.module.css';
import fontsStyles from '../styles/fonts.module.css';

export default function FooterComponent() {
    return (
        <footer className={styles.footer + " " + fontsStyles.ZH}>
            <div className={styles["footer-inner"] + " container"}>
                <div className={styles.hr + " row"}>
                    <div className={styles["footer-inner-left"] + " col-8"}>
                        <div className={styles.hr + ' ' + styles["footer-block-logo"]}>
                            <img className={styles["footer-logo"]} src="/media/Logo.png" alt="" />
                            <a className={styles.anchor}>
                                <span className={fontsStyles.ENG}>Origin</span>
                                <span className={fontsStyles.ZH}>起源劇團</span>
                            </a>
                        </div>
                        <div className={styles["footer-block-media"]} >
                            <Link href="/facebook" className={fontsStyles.ENG + ' ' + styles.anchor + ' pointer'} target="_blank">
                                <img src="/media/facebook.svg" width="24" height="24" alt="" />
                                OriginPerformingArt
                            </Link>
                            <Link href="/instagram" className={fontsStyles.ENG + ' ' + styles.anchor + ' pointer'} target="_blank">
                                <img src="/media/instagram.svg" width="24" height="24" alt="" />
                                origin_performing_art
                            </Link>
                        </div>
                    </div>
                    <div className={styles["footer-inner-right"] + " col-4"}>
                        <div className={styles["footer-block-link"]}>
                            <Link href="/" className={styles.anchor + ' pointer'}>首頁</Link>
                            <Link href="/about" className={styles.anchor + ' pointer'}>關於我們</Link>
                            <Link href="/event" className={styles.anchor + ' pointer'}>活動行程</Link>
                            <Link href="/blog" className={fontsStyles.ENG + ' ' + styles.anchor + ' pointer'}>BLOG</Link>
                            <Link href="/contact" className={styles.anchor + ' pointer'}>聯絡我們</Link>
                        </div>
                    </div>
                </div>
                <div className={"row"}>
                    <small className={fontsStyles.ENG + ' ' + styles['footer-block-copyright']}>Copyright© 2022 <a href="https://github.com/PMinn"
                        target="_blank">P'MIN.</a> All Rights Reserved.</small>
                </div>
            </div>
        </footer>
    )
}