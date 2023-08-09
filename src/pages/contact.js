import Link from 'next/link';

import fontsStyles from '../styles/fonts.module.css';
import styles from '../styles/contact.module.css';

export default function Contact() {
    return (
        <main>
            <h2 className={fontsStyles.ZH + ' ' + styles.title} >聯絡我們</h2>
            <div className={styles.content}>
                <Link href="https://www.instagram.com/origin_performing_art/" className={fontsStyles.ENG + ' ' + styles['social-link'] + ' ' + styles.instagram + ' anchor pointer'} target="_blank">
                    <div className={styles["contact-logo"]}>
                        <img src="/media/instagram.svg" alt="" />
                    </div>
                    <span>@origin_performing_art</span>
                </Link>
                <Link href="https://www.facebook.com/OriginPerformingArt/" className={fontsStyles.ENG + ' ' + styles['social-link'] + ' ' + styles.facebook + ' anchor pointer'} target="_blank">
                    <div class={styles["contact-logo"]}>
                        <img src="/media/facebook.svg" alt="" />
                    </div>
                    <span>OriginPerformingArt</span>
                </Link>
            </div>
        </main>
    )
}