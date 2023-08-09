import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/NavComponent.module.css';
import fontsStyles from '../styles/fonts.module.css';

export default function NavComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenuShow, setIsMenuShow] = useState(false);
    function menuIconOnclick() {
        if (isOpen != isMenuShow) return;
        if (isOpen) {
            setIsMenuShow(!isMenuShow);
            setTimeout(() => setIsOpen(!isOpen), 500);
        } else {
            setIsOpen(!isOpen);
            setTimeout(() => setIsMenuShow(!isMenuShow), 50);
        }
    }

    return (
        <div>
            <nav className={styles.nav}>
                <Link href="/" className={fontsStyles.ENG + ' ' + styles.title + " pointer"}>
                    <h1>Origin</h1>
                </Link>
                <div className={styles['menu-icon'] + ' ' + (isMenuShow ? styles.open : '') + ' pointer'} onClick={menuIconOnclick}>
                    <div></div>
                    <div></div>
                </div>
            </nav>
            <div className={styles.menu + ' ' + (isOpen ? styles.open : '') + ' ' + (isMenuShow ? styles.show : '')}>
                <div>
                    <Link href="/" className={fontsStyles.ZH + " pointer"}>首頁</Link>
                    <Link href="/about" className={fontsStyles.ZH + " pointer"}>關於我們</Link>
                    <Link href="/event" className={fontsStyles.ZH + " pointer"}>活動行程</Link>
                    <Link href="/blog" className={fontsStyles.ENG + " pointer"}>BLOG</Link>
                    <Link href="/contact" className={fontsStyles.ZH + " pointer"}>聯絡我們</Link>
                </div>
            </div>
        </div>
    )
}